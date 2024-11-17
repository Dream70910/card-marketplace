import { db, storage } from "./config"
import { collection, addDoc, getDocs, query, where, doc, updateDoc, getDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createListing = async (userId, images, title, condition, price, category, description) => {
    try {
        // Reference to the "listings" collection
        const listingRef = collection(db, "listings")
        const imageURLs = []

        await Promise.all(images.map(async (image, index) => {
            const storageRef = ref(storage, `images/listings/${title}-${index + 1}`);
            await uploadBytes(storageRef, image);
            const imageURL = await getDownloadURL(storageRef);
            imageURLs.push(imageURL);
        }));

        // Add a new document with a generated ID
        const docRef = await addDoc(listingRef, {
            seller: userId,
            images: imageURLs,
            title: title,
            condition: condition,
            price: parseInt(price),
            category: category,
            description: description
        })

        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

export const getAllListings = async () => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        // Create a query to filter listings by state
        const q = query(listingsRef)
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            listings.push({ id: doc.id, ...doc.data() })
        })

        return listings // Return the array of listings
    } catch (e) {
        console.error("Error getting documents: ", e)
        return [] // Return an empty array in case of error
    }
}

export const getListingsByCategories = async (categories) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        for (let category of categories) {
            const q = query(listingsRef, where("category", "==", category))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                listings.push({ id: doc.id, ...doc.data() })
            })
        }

        return listings // Return the array of listings
    } catch (e) {
        console.error("Error getting documents: ", e)
        return [] // Return an empty array in case of error
    }
}

export const getListingByID = async (id) => {
    try {
        // Reference to the specific document in the "listings" collection
        const listingRef = doc(db, "listings", id);

        // Retrieve the document snapshot
        const docSnapshot = await getDoc(listingRef);

        // Check if the document exists
        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, ...docSnapshot.data() }; // Return the listing data
        } else {
            console.error("No such document!");
            return null; // Return null if the document does not exist
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        return null; // Return null in case of error
    }
}