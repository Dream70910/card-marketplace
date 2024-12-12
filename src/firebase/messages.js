import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./config"

export const setMessageRead = async (msgId) => {
    try {
        // Reference to the specific user document
        const messagesRef = doc(db, "messages", msgId)
        const messageSnapshot = await getDoc(messagesRef)
        const messageData = messageSnapshot.data()

        await updateDoc(messagesRef, { ...messageData, state: "read" })
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}