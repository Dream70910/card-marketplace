import { db, storage } from "./config"
import { collection, addDoc, getDocs, query, where, doc, updateDoc, getDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createListing = async ({ userId, username, images, title, condition, price, category, description, brand }) => {
    try {
        // Reference to the "listings" collection
        const listingRef = collection(db, "listings")
        const imageURLs = []

        await Promise.all(images.map(async (image, index) => {
            const storageRef = ref(storage, `images/listings/${title}-${index + 1}`)
            await uploadBytes(storageRef, image)
            const imageURL = await getDownloadURL(storageRef)
            imageURLs.push(imageURL)
        }))

        // Add a new document with a generated ID
        const docRef = await addDoc(listingRef, {
            seller: userId,
            sellerUserName: username,
            pictures: imageURLs,
            title: title,
            condition: condition,
            price: parseInt(price),
            brand: brand,
            condition: condition,
            category: category,
            description: description,
            creatd_at: new Date()
        })

        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

export const getAllListings = async (userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        // Create a query to filter listings by state
        const q = query(
            listingsRef,
            where('seller', '!=', userId)
        )
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

export const getSearchedListings = async (userId, search) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        // Create a query to filter listings by state
        const q = query(
            listingsRef,
            where('seller', '!=', userId)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            doc.data().title.includes(search) && listings.push({ id: doc.id, ...doc.data() })
        })

        return listings // Return the array of listings
    } catch (e) {
        console.error("Error getting documents: ", e)
        return [] // Return an empty array in case of error
    }
}

export const getListingsByCategories = async (categories, userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        for (let category of categories) {
            const q = query(
                listingsRef,
                where("category", "==", category),
                where("seller", '!=', userId)
            )
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

export const getListingsByBrands = async (brands, userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        for (let brand of brands) {
            const q = query(
                listingsRef,
                where("brand", "==", brand),
                where("seller", '!=', userId)
            )
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

export const getListingsByConditions = async (conditions, userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        for (let condition of conditions) {
            const q = query(
                listingsRef,
                where("condition", "==", condition),
                where("seller", '!=', userId)
            )
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

export const getListingsByPrice = async (value, userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        const q = query(
            listingsRef,
            where("price", ">=", value.min),
            where("price", "<=", value.max),
            where("seller", '!=', userId)
        )
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

export const getListingsByUserId = async (userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        // Create a query to filter listings by sellerId
        const q = query(listingsRef, where("seller", "==", userId))
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

export const getListingByID = async (id) => {
    try {
        // Reference to the specific document in the "listings" collection
        const listingRef = doc(db, "listings", id)

        // Retrieve the document snapshot
        const docSnapshot = await getDoc(listingRef)

        // Check if the document exists
        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, ...docSnapshot.data() } // Return the listing data
        } else {
            console.error("No such document!")
            return null // Return null if the document does not exist
        }
    } catch (e) {
        console.error("Error getting document: ", e)
        return null // Return null in case of error
    }
}

export const getPurchasedListings = async (userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        // Create a query to filter listings by sellerId
        const q = query(listingsRef, where("buyer", "==", userId))
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

export const getSoldListings = async (userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        // Create a query to filter listings by sellerId
        const q = query(
            listingsRef,
            where("seller", "==", userId),
            where("buyer", ">=", "")
        )

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

export const addToCart = async (userId, cartedItem) => {
    try {
        // Reference to the specific user document
        const usersRef = doc(db, "users", userId)
        const userSnapshot = await getDoc(usersRef)
        const userData = userSnapshot.data()
        const oldCart = userData.cartList ? userData.cartList : []
        if (oldCart.findIndex(item => item.id === cartedItem.id) === -1) {
            const newUserData = { ...userData, cartList: [...oldCart, cartedItem] }
            await updateDoc(usersRef, newUserData)
        }
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}

export const removeFromCart = async (userId, cartId) => {
    try {
        // Reference to the specific user document
        const usersRef = doc(db, "users", userId)
        const userSnapshot = await getDoc(usersRef)
        const userData = userSnapshot.data()
        const oldCart = userData.cartList ? userData.cartList : []
        const newCart = oldCart.reduce((acc, cur) => {
            if (cur.id !== cartId)
                acc.push(cur)
            return acc
        }, [])

        const newUserData = { ...userData, cartList: newCart }

        await updateDoc(usersRef, newUserData)
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}

export const isListingInCart = async (userId, listingId) => {
    try {
        // Reference to the specific user document
        const usersRef = doc(db, "users", userId)
        const userSnapshot = await getDoc(usersRef)
        const userData = userSnapshot.data()
        const oldCart = userData.cartList ? userData.cartList : []
        if (oldCart.findIndex(item => item.id === listingId) > -1) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}

export const buyListing = async (userId, card) => {
    try {
        // Reference to the specific user document
        const usersRef = doc(db, "users", userId)
        const userSnapshot = await getDoc(usersRef)
        const userData = userSnapshot.data()

        const listingsRef = doc(db, "listings", card.id)
        const listingSnapshot = await getDoc(listingsRef)
        const listingData = listingSnapshot.data()

        const newUserData = { ...userData, balance: userData.balance - card.price }
        await updateDoc(listingsRef, { ...listingData, state: "pending", buyer: userId })
        await updateDoc(usersRef, newUserData)
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}

export const cancelBuyListing = async (card) => {
    try {
        // Reference to the specific user document
        const usersRef = doc(db, "users", card.buyer)
        const userSnapshot = await getDoc(usersRef)
        const userData = userSnapshot.data()

        const listingsRef = doc(db, "listings", card.id)
        const listingSnapshot = await getDoc(listingsRef)
        const listingData = listingSnapshot.data()

        const newUserData = { ...userData, balance: userData.balance + card.price }
        await updateDoc(listingsRef, { ...listingData, state: "active", buyer: null })
        await updateDoc(usersRef, newUserData)
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}

export const acceptBuyListing = async (card) => {
    try {
        // Reference to the specific user document
        const usersRef = doc(db, "users", card.seller)
        const userSnapshot = await getDoc(usersRef)
        const userData = userSnapshot.data()

        const listingsRef = doc(db, "listings", card.id)
        const listingSnapshot = await getDoc(listingsRef)
        const listingData = listingSnapshot.data()

        const newUserData = { ...userData, balance: userData.balance + card.price }
        await updateDoc(listingsRef, { ...listingData, state: "active", buyer: null, seller: card.buyer })
        await updateDoc(usersRef, newUserData)
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}