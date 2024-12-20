import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db, storage } from "./config"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const generateUsername = (email) => {
    const username = email.split('@')[0];
    return username;
};

const getUserCountByUsernamePrefix = async (prefix) => {
    const usersRef = collection(db, 'users');

    // Create a query to filter usernames that start with the specified prefix
    const q = query(
        usersRef,
        where('username', '>=', prefix),
        where('username', '<', prefix + '\uf8ff') // This ensures it captures all usernames starting with the prefix
    );

    try {
        const querySnapshot = await getDocs(q);
        const userCount = querySnapshot.size; // Get the number of documents
        console.log(`Number of users with usernames starting with '${prefix}':`, userCount);
        return userCount;
    } catch (error) {
        console.error("Error getting users:", error);
        return 0; // Return 0 or handle error as needed
    }
};

export async function createUserProfile(userId, email) {
    try {
        const existing = await checkUserExists(userId)

        if (!existing) {
            const username = generateUsername(email)
            await setDoc(doc(db, "users", userId), {
                username: username,
                role: 'customer',
                gender: 'man',
                displayName: username,
                picture: "https://firebasestorage.googleapis.com/v0/b/card-market-place-a2684.firebasestorage.app/o/images%2Fusers%2Fdefault.png?alt=media&token=3da906c9-a825-4f0b-b47c-ab6d10eefe89",
                balance: 0,
                cartList: [],
                email: email
            });
        }

        console.log("User profile created successfully");
    } catch (error) {
        console.error("Error creating user profile: ", error);
    }
}

export const updateUserProfile = async (userId, updatedData) => {
    try {
        // Reference to the specific user document
        let pictureURL

        const usersRef = doc(db, "users", userId)
        const docSnap = await getDoc(usersRef)
        const querySnapshot = docSnap.data()
        if (updatedData.picture !== null && updatedData.picture !== undefined) {
            const storageRef = ref(storage, `images/users/${querySnapshot.username}`)
            await uploadBytes(storageRef, updatedData.picture)
            pictureURL = await getDownloadURL(storageRef)
        }

        // Add a new document with a generated ID
        const newPictureURL = updatedData.picture ? pictureURL : querySnapshot.picture
        const newData = {
            ...updatedData,
            ...{
                picture: newPictureURL
            }
        }

        // Update the usersRef with new data
        await updateDoc(usersRef, newData)

        console.log("Document updated with ID: ", userId)
    } catch (e) {
        console.error("Error updating document: ", e)
    }
}

// export const checkUserExists = async (username) => {
//     try {
//         const usersRef = collection(db, "users")
//         const q = query(usersRef, where("username", "==", username))
//         const querySnapshot = await getDocs(q)

//         if (!querySnapshot.empty) {
//             return true // User exists
//         } else {
//             return false // User does not exist
//         }
//     } catch (e) {
//         console.error("Error checking user:", e)
//     }
// }

export const checkUserExists = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            return true; // User exists
        } else {
            console.log("User does not exist");
            return false; // User does not exist
        }
    } catch (e) {
        console.error("Error checking user:", e)
    }
}

export const getUserData = async (userId) => {
    try {
        // Reference to the specific user document
        const usersRef = doc(db, "users", userId)
        const userSnapshot = await getDoc(usersRef)
        const userData = userSnapshot.data()

        const messagesRef = collection(db, "messages")
        const unReadMessages = []
        const q = query(messagesRef,
            where("recipientId", "==", userId),
            where("state", "==", 'unread'))
        const querySnapshot = await getDocs(q)

        const purchases = userData.purchases ? userData.purchases : 0

        querySnapshot.forEach((doc) => {
            unReadMessages.push({ id: doc.id, ...doc.data() })
        })

        return { ...userData, unReadMessages: unReadMessages, purchases }
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}

export const getAllUserData = async () => {
    try {
        // Reference to the users collection
        const usersRef = collection(db, "users");
        const userSnapshot = await getDocs(usersRef);

        // Map through the documents and extract data
        const usersList = userSnapshot.docs.map(doc => ({
            id: doc.id,
            tickets: 0,
            ...doc.data()
        }));

        return usersList;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

export const addRecipient = async (userId, recipientId) => {
    try {
        // Reference to the specific user document
        const usersRef = doc(db, "users", userId)
        const userSnapshot = await getDoc(usersRef)
        const userData = userSnapshot.data()
        let recipients = userData.recipients ? userData.recipients : []
        const getRecipientData = await getUserData(recipientId)

        if (recipients.findIndex(item => item.id === recipientId) === -1) {
            recipients.push({ id: recipientId, displayName: getRecipientData.displayName, picture: getRecipientData.picture })
        }

        await updateDoc(usersRef, { ...userData, recipients: recipients })
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}