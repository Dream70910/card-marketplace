import { db, storage } from "./config"
import { collection, addDoc, getDocs, query, where, doc, updateDoc, getDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const createListing = async ({ userId, username, images, title, condition, price, category, description, brand, date, rarity }) => {
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
            rarity: rarity,
            condition: condition,
            category: category,
            description: description,
            state: 'local',
            creatd_at: date
        })

        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

export const updateCardState = async (cardId, state) => {
    try {
        // Reference to the specific card document in the "listings" collection
        const cardRef = doc(db, "listings", cardId);

        // Update the state of the card to 'local'
        await updateDoc(cardRef, { state: state });
    } catch (e) {
        console.error("Error updating card state: ", e);
    }
};


export const getAllListings = async (userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        // Create a query to filter listings by state
        const q = query(
            listingsRef,
            where('seller', '!=', userId),
            where('state', '==', 'market')
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
            where('seller', '!=', userId),
            where('state', '==', 'market')
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
                where("seller", '!=', userId),
                where('state', '==', 'market')
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
                where("seller", '!=', userId),
                where('state', '==', 'market')
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
                where("seller", '!=', userId),
                where('state', '==', 'market')
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

export const getListingsByRarities = async (rarities, userId) => {
    try {
        // Reference to the "listings" collection
        const listingsRef = collection(db, "listings")

        const listings = []

        for (let rarity of rarities) {
            const q = query(
                listingsRef,
                where("rarity", "==", rarity),
                where("seller", '!=', userId),
                where('state', '==', 'market')
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
            where("seller", '!=', userId),
            where('state', '==', 'market')
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
        await updateDoc(listingsRef, { ...listingData, state: "market", buyer: null })
        await updateDoc(usersRef, newUserData)
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}

// export const acceptBuyListing = async (card) => {
//     try {
//         // Reference to the specific user document
//         const usersRef = doc(db, "users", card.seller)
//         const userSnapshot = await getDoc(usersRef)
//         const userData = userSnapshot.data()

//         const listingsRef = doc(db, "listings", card.id)
//         const listingSnapshot = await getDoc(listingsRef)
//         const listingData = listingSnapshot.data()

//         const newUserData = { ...userData, balance: userData.balance + card.price }
//         await updateDoc(listingsRef, { ...listingData, state: "active", buyer: null, seller: card.buyer })
//         await updateDoc(usersRef, newUserData)
//     } catch (e) {
//         console.error("Error getting document: ", e)
//     }
// }

export const acceptOnSellerSide = async (card) => {
    try {
        const listingsRef = doc(db, "listings", card.id)
        const listingSnapshot = await getDoc(listingsRef)
        const listingData = listingSnapshot.data()

        await updateDoc(listingsRef, { ...listingData, state: "delivering" })
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}

export const acceptOnBuyerSide = async (card) => {
    try {
        // Reference to the specific user document
        const sellerRef = doc(db, "users", card.seller)
        const sellerSnapshot = await getDoc(sellerRef)
        const sellerData = sellerSnapshot.data()

        const listingsRef = doc(db, "listings", card.id)
        const listingSnapshot = await getDoc(listingsRef)
        const listingData = listingSnapshot.data()

        const newSellerData = { ...sellerData, balance: sellerData.balance + card.price * 0.95 }

        await updateDoc(listingsRef, { ...listingData, state: "local", buyer: null, seller: card.buyer })
        await updateDoc(sellerRef, newSellerData)

        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("role", "==", 'admin'));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const adminDoc = querySnapshot.docs[0]; // Get the first document
            const adminData = adminDoc.data(); // Get the data from the document

            // Add balance to the admin user
            const newAdminData = { ...adminData, balance: adminData.balance + card.price * 0.05 }; // Assuming you want to give the admin 5% of the card price
            const adminRef = doc(db, "users", adminDoc.id);

            await updateDoc(adminRef, newAdminData);
        } else {
            console.log("No admin user found.");
        }
    } catch (e) {
        console.error("Error getting document: ", e)
    }
}