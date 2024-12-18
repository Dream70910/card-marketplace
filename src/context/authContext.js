import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth"
import { auth, db } from "../firebase/config"
import { checkUserExists, createUserProfile, getUserData } from "../firebase/users"
import { useNavigate } from "react-router-dom"
import { doc, onSnapshot } from "firebase/firestore"
import { useAtom } from "jotai"
import { userAtom } from "../store"


export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error("There is not auth provider")
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useAtom(userAtom)

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      await createUserProfile(user.uid, user.email)
      alert("User signed up successfully")

      if (user) {
        sendEmailVerification(user)
        alert("Verification email sent. Please check your inbox.")
      } else {
        console.log("User creation failed. User is null.")
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email address is already in use. Please use a different email or log in.")
      }
      if (error.code === "auth/invalid-email") {
        alert("The email address is not valid. Please enter a valid email.")
      }
      if (error.code === "auth/weak-password") {
        alert("The password is too weak. Please choose a stronger password.")
      }
      if (error.code === "auth/user-token-expired") {
        alert("Your session has expired. Please log in again.")
      }
    }
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    signOut(auth)
  }

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      createUserProfile(user.uid, user.email);
    } catch (error) {
      console.error("Error during sign-in:", error.code, error.message);
    }
  }

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
  }

  const getUpdatedUserData = () => {
    if (user && user.uid) {
      getUserData(user.uid).then((data) => {
        setUserData({ ...data, id: user.uid })
        localStorage.setItem('userData', JSON.stringify({ ...data, id: user.uid }))
      })
    }
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    if ((!storedUserData && !user) && !window.location.pathname.includes('/login')) {
      window.location.href = window.location.protocol + '//' + window.location.host + '/login'
    }
  }, [window.location.href])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)

      if (currentUser) {
        setTimeout(() => {
          getUserData(currentUser.uid).then((data) => {
            setUserData({ ...data, id: currentUser.uid })
            localStorage.setItem('userData', JSON.stringify({ ...data, id: currentUser.uid }))
          })
        }, 1000);
      } else {
        // Clear user data from localStorage if no user is signed in
        localStorage.removeItem('userData')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        getUpdatedUserData
      }}
    >
      {children}
    </authContext.Provider>
  )
}
