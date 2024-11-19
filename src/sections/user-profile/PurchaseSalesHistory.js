import React, { useEffect, useState } from "react"
import CardPurchaseHistory from "../../components/cards/CardPurchaseHistory"
import CardOrder from "../../components/cards/CardOrder"
import CartItem from "../../components/cards/CartItem"
import Button from "../../components/commons/Button"
import Dropdown from "../../components/commons/Dropdown"
import TextInput from "../../components/commons/TextInput"
import TableSalesHistory from "../../components/tabels/TableSalesHistory"
import { useAuth } from "../../context/authContext"
import { getUserData } from "../../firebase/users"
import { buyListing, cancelBuyListing, getPurchasedListings, getSoldListings, removeFromCart } from "../../firebase/listings"
import { toast } from "react-toastify"
import { useAtom } from "jotai"
import { userAtom } from "../../store"
import CardSoldHistory from "../../components/cards/CardSoldHistory"

const PurchaseSalesHistory = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('cart')
  const [userData, setUserData] = useState('user')
  const { user } = useAuth()

  useEffect(() => {
    user &&
      getUserData(user.uid).then((data) => {
        setUserData(data)
      })
  }, [user])

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    user && <div>
      <ul className="w-full flex">
        <li
          className={`text-white text-center w-full pb-4 border-b-2 cursor-pointer ${activeTab === "cart" ? "border-b-primary" : "border-b-white/20"
            }`}
          onClick={() => handleTabClick("cart")}
        >
          Cart
        </li>
        <li
          className={`text-white text-center w-full pb-4 border-b-2 cursor-pointer ${activeTab === "purchase" ? "border-b-primary" : "border-b-white/20"
            }`}
          onClick={() => handleTabClick("purchase")}
        >
          Purchase History
        </li>
        <li
          className={`text-white text-center w-full pb-4 border-b-2 cursor-pointer ${activeTab === "sale" ? "border-b-primary" : "border-b-white/20"
            }`}
          onClick={() => handleTabClick("sale")}
        >
          Sale History
        </li>
      </ul>

      {/* Render the appropriate component based on the active tab */}
      {activeTab === "cart" ? <CartList /> :
        activeTab === 'purchase' ? <PurchaseHistory /> : <SaleHistory />}
    </div>
  )
}

const CartList = () => {
  const [userData, setUserAtom] = useAtom(userAtom)

  const removeItemFromCart = async (card) => {
    await removeFromCart(userData.id, card.id)
    const oldCart = userData.cartList.reduce((acc, cur) => {
      if (cur.id !== card.id) acc.push(cur)
      return acc
    }, [])

    setUserAtom({ ...userData, cartList: oldCart })
  }

  const handleCancleCard = async (card) => {
    removeItemFromCart(card)
    toast.success(`${card.title} was removed from cart !`)
  }

  const handleBuyCard = async (card) => {
    if (userData.balance < card.price) {
      toast.error(`Your balance is not enough !`)
    } else {
      setUserAtom({ ...userData, balance: userData.balance - card.price })
      await removeItemFromCart(card)
      await buyListing(userData.id, card)
      toast.success(`${card.title} is on pending !`)
    }
  }

  return (
    <div className="w-full  mt-12">
      <div className="hidden lg:block ">
        {/* <TableSalesHistory /> */}
      </div>
      {/*  */}
      <div className="mt-12 space-y-6">
        {
          userData && userData.cartList.map((item) =>
            <CartItem
              item={item}
              handleCancleCard={handleCancleCard}
              handleBuyCard={handleBuyCard}
              key={item.id}
            />
          )
        }
      </div>
      {/* <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
        <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
          Load More
        </button>
      </div> */}
    </div>
  )
}

const SaleHistory = () => {
  const [soldItems, setSoldItems] = useState([])
  const [userData, setUserData] = useAtom(userAtom)

  useEffect(() => {
    getSoldListings(userData.id).then((items) => {
      setSoldItems(items)
    })
  })

  const onCancelBuy = async (card) => {
    await cancelBuyListing(userData.id, card)
    toast.success(`${card.title} was cancelled`)
    setUserData({ ...userData, balance: userData.balance + card.price })
  }

  const onAcceptBuy = async (card) => {
    await cancelBuyListing(userData.id, card)
    toast.success(`${card.title} was cancelled`)
    setUserData({ ...userData, balance: userData.balance + card.price })
  }

  return (
    <div className="mt-12 space-y-6">
      {
        soldItems.map((item) =>
          <CardSoldHistory
            imageSrc={item.pictures[0]}
            title="pokemon pecharunt x 2"
            status="Pending"
            // date="17 Sept, 2023"
            avatarSrc="/assets/avatars/avatar.png"
            userName="Emily Johnson"
            price={`$ ${item.price}`}
            sellerId={item.seller}
            onCancelBuy={() => onCancelBuy(item)}
            onAcceptBuy={() => onAcceptBuy(item)}
            key={item.uid}
          />
        )
      }

      <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
        <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
          Load More
        </button>
      </div>
    </div>
  )
}

const PurchaseHistory = () => {
  const [purchasedItems, setPurhcasedItems] = useState([])
  const [userData, setUserData] = useAtom(userAtom)

  useEffect(() => {
    getPurchasedListings(userData.id).then((items) => {
      setPurhcasedItems(items)
    })
  })

  const onCancelBuy = async (card) => {
    await cancelBuyListing(userData.id, card)
    toast.success(`${card.title} was cancelled`)
    setUserData({ ...userData, balance: userData.balance + card.price })
  }

  return (
    <div className="mt-12 space-y-6">
      {
        purchasedItems.map((item) =>
          <CardPurchaseHistory
            imageSrc={item.pictures[0]}
            title="pokemon pecharunt x 2"
            status="Pending"
            // date="17 Sept, 2023"
            avatarSrc="/assets/avatars/avatar.png"
            userName="Emily Johnson"
            price={`$ ${item.price}`}
            sellerId={item.seller}
            onCancelBuy={() => onCancelBuy(item)}
            key={item.uid}
          />
        )
      }

      <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
        <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
          Load More
        </button>
      </div>
    </div>
  )
}


export default PurchaseSalesHistory