import { db, storage } from "./config"
import { collection, addDoc, getDocs, query, where, doc, updateDoc, getDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createCategory = async (image, name, description) => {
    try {
        // Reference to the "categories" collection
        const categoriesRef = collection(db, "categories")
        let imageURL

        if (image !== null) {
            const storageRef = ref(storage, `images/categories/${name}`)
            await uploadBytes(storageRef, image)
            imageURL = await getDownloadURL(storageRef)
        }

        // Add a new document with a generated ID
        const docRef = await addDoc(categoriesRef, {
            image: image ? imageURL : null,
            name: name,
            description: description,
            state: 'pending'
        })

        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

export const updateCategory = async (updatedData) => {
    try {
        // Reference to the specific category document
        const categoryRef = doc(db, "categories", updatedData.id)
        const categorySnapshot = await getDoc(categoryRef)
        const categoryData = categorySnapshot.data()
        let imageURL = categoryData.image

        if (!(updatedData.picture === undefined || updatedData.picture === null)) {
            const storageRef = ref(storage, `images/categories/${updatedData.name}`)
            await uploadBytes(storageRef, updatedData.picture)
            imageURL = await getDownloadURL(storageRef)
        }

        const newData = {
            name: updatedData.name,
            description: updatedData.description,
            image: imageURL,
            state: updatedData.state ? updatedData.state : categoryData.state
        }

        // Update the document with new data
        await updateDoc(categoryRef, newData)

        console.log("Document updated with ID: ", updatedData.id)
    } catch (e) {
        console.error("Error updating document: ", e)
    }
}

export const createCategoryWithImage = async (categoryId, updatedData) => {
    try {
        // Reference to the specific category document
        const categoryRef = doc(db, "categories", categoryId)

        // Update the document with new data
        await updateDoc(categoryRef, updatedData)

        console.log("Document updated with ID: ", categoryId)
    } catch (e) {
        console.error("Error updating document: ", e)
    }
}

export const getAllCategories = async (states = ["active"]) => {
    try {
        // Reference to the "categories" collection
        const categoriesRef = collection(db, "categories")

        const categories = []

        // Create a query to filter categories by state
        for (let state of states) {
            const q = query(categoriesRef, where("state", "==", state))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                categories.push({ id: doc.id, ...doc.data() })
            })
        }

        return categories // Return the array of categories
    } catch (e) {
        console.error("Error getting documents: ", e)
        return [] // Return an empty array in case of error
    }
}

export const getCategoryById = async (categoryId) => {
    try {
        // Reference to the "categories" collection
        const categoriesRef = doc(db, "categories", categoryId)
        const querySnapshot = await getDoc(categoriesRef)

        return querySnapshot.data()
    } catch (e) {
        console.error("Error getting category: ", e)
        return null // Return null in case of error
    }
}

export const checkCategoryExists = async (categoryName) => {
    try {
        const categoriesRef = collection(db, "categories")
        const q = query(categoriesRef, where("name", "==", categoryName))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            return true // Category exists
        } else {
            return false // Category does not exist
        }
    } catch (error) {
        console.error("Error checking category:", error)
    }
}