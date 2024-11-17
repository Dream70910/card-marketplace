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
import { buyListing, removeFromCart } from "../../firebase/listings"
import { toast } from "react-toastify"
import { useAtom } from "jotai"
import { userAtom } from "../../store"

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

  const removeItemFromCart = (card) => {
    removeFromCart(userData.id, card.id)
    const oldCart = userData.cartList.reduce((acc, cur) => {
      if (cur.id !== card.id) acc.push(cur)
      return acc
    }, [])

    setUserAtom({ ...userData, cartList: oldCart })
  }

  const handleCancleCard = (card) => {
    removeItemFromCart(card)
    toast.success(`${card.title} was removed from cart !`)
  }

  const handleBuyCard = (card) => {
    if (userData.balance < card.price) {
      toast.error(`Your balance is not enough !`)
    } else {
      toast.success(`${card.title} is on pending !`)
      setUserAtom({ ...userData, balance: userData.balance - card.price })
      removeItemFromCart(card)
      buyListing(userData.id, card)
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
  return (
    <div className="w-full  mt-12">
      {/* <div className="flex flex-col lg:flex-row items-end gap-5 lg:gap-12 justify-between w-full">
        <TextInput placeholder="Search for cards" divClassName=" lg:hidden" />
        <div className="flex items-center w-full gap-6">
          <Dropdown
            options={options}
            placeholder="Filter by"
            onChange={handleDropdownChange}
            className="w-full lg:max-w-[285px]"
          />
          <TextInput
            placeholder="Search for cards"
            divClassName="hidden lg:flex"
          />
          <Dropdown
            options={options2}
            placeholder="Sort by"
            onChange={handleDropdownChange2}
            className="w-full lg:max-w-[150px]"
          />
          <Dropdown
            options={options3}
            placeholder="Date by"
            onChange={handleDropdownChange3}
            className="hidden lg:flex w-full lg:max-w-[150px]"
          />
        </div>
        <span className="hidden lg:flex whitespace-nowrap text-white">
          Showing 18 of 18 orders
        </span>
      </div>{" "} */}
      <div className="hidden lg:block ">
        <TableSalesHistory />
      </div>
      {/*  */}
      <div className="space-y-4 mt-8 lg:hidden">
        <CardOrder
          productImage="/assets/images/image_item_2.png"
          rating={5}
          productName="Pokemon Pecharunt x 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.."
          price="29.99"
          status="In-Process"
          deliveryStatus="Expected Delivery"
          deliveryDate="17 Oct, 2024"
          userAvatar="/assets/avatars/avatar.png"
          userName="Emily Johnson"
          isVerified={true}
          onMessageClick={() => console.log("Send message clicked")}
          onCancelClick={() => console.log("Cancel order clicked")}
          onViewSummaryClick={() => console.log("View order summary clicked")}
        />
      </div>
      {/*  */}
      {/* <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
        <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
          Load More
        </button>
      </div> */}
    </div>
  )
}

const PurchaseHistory = () => {
  return (
    <div className="mt-12 space-y-6">
      <CardPurchaseHistory
        imageSrc="/assets/images/image_item_2.png"
        title="pokemon pecharunt x 2"
        status="Delivered"
        date="17 Sept, 2023"
        avatarSrc="/assets/avatars/avatar.png"
        userName="Emily Johnson"
        price="$29.99"
        onContactSeller={() => { }}
        onReview={() => { }}
      />

      <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
        <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
          Load More
        </button>
      </div>
    </div>
  )
}


export default PurchaseSalesHistory