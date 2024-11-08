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
import { auth } from "../firebase-config"

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error("There is not auth provider")
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
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

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
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
      }}
    >
      {children}
    </authContext.Provider>
  )
}
