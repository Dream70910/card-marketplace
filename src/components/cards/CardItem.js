import React, { useEffect, useState } from "react";
import Button from "../commons/Button";
import { Link } from "react-router-dom";
import { addToCart } from "../../firebase/listings";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { userAtom } from "../../store";

const CardItem = ({
  imageSrc,
  rarity = "",
  title = "Item Title",
  quantity = "",
  price = "$0.00",
  description = "Item description goes here.",
  buttonText = "Buy Now",
  cardClassName = "",
  imageClassName = "",
  titleClassName = "",
  priceClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  isRare = false,
  sellerId = "",
  sellerUserName = "",
  cardId = ""
}) => {
  const [isInCart, setIsInCart] = useState(false)
  const { getUpdatedUserData } = useAuth()
  const [userData, setUserData] = useAtom(userAtom)

  useEffect(() => {
    userData && userData.cartList && isListingInCart()
  }, [userData])

  const isListingInCart = () => {
    if (userData.cartList.findIndex(item => item.id === cardId) > -1) setIsInCart(true)
    else setIsInCart(false)
  }

  const handleAddtoCart = async (e) => {
    e.preventDefault()

    const cartedItem = { title: title, price: price, picture: imageSrc, sellerId: sellerId, sellerUserName: sellerUserName, id: cardId }

    // const newData = { ...userData, cartList: [...userData.cartList, cartedItem] }
    // setUserData(newData)
    setIsInCart(true)

    await addToCart(userData.id, cartedItem)
    getUpdatedUserData()
    toast.success(`${title} was successfully added to cart !`)
  }

  return (
    <div
      className={`p-3 flex flex-col card-item w-full bg-white/5 backdrop-blur-sm ${cardClassName}`}
    >
      <div className="relative">
        <div className="relative w-full !pt-[90%]">
          <img
            src={imageSrc || "/assets/images/image_item_default.png"}
            alt={title}
            className={`!absolute top-0 h-full object-cover w-full ${imageClassName}`}
          />
        </div>
        {/* {isRare && ( */}
        {/* <span className="text-white p-2 px-4 bg-primary-gradient absolute top-2 right-2  font-aero uppercase text-[8px] lg:text-xs">
          {rarity}
        </span> */}
        {/* )} */}
      </div>

      <div className="mt-3 flex flex-col justify-between h-full gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-base text-primary uppercase font-aeonik font-bold text-nowrap ${priceClassName}`}
            >
              {
                typeof price === 'number' ?
                  '$' + price.toFixed(2) : price
              }
            </span>
          </div>

          <h4
            className={`text-lg uppercase text-white leading-[1.4] ${titleClassName}`}
          >
            {title} {quantity}
          </h4>

          <p
            className={`text-white/60 text-sm mt-1 font-light ${descriptionClassName}`}
          >
            {description}
          </p>
        </div>
        {/* {
          userData ?
            <>
              {
                !isInCart ?
                  <Button
                    divClassName={`text-sm lg:text-base ${buttonClassName}`}
                    onClick={handleAddtoCart}
                  >
                    Add to Cart
                  </Button>
                  :
                  <Button
                    divClassName={`text-sm lg:text-base ${buttonClassName}`}
                  >
                    Go to Detail
                  </Button>
              }
            </> :
            <Link to="/login">
              <Button
                divClassName={`text-sm lg:text-base ${buttonClassName}`}
              >
                Login
              </Button>
            </Link>
        } */}
        <Link to={`/marketplace/${cardId}`}>
          <Button
            divClassName={`bg-primary text-base ${buttonClassName}`}
            buttonClassName="group-hover:!bg-white group-hover:!bg-none group-hover:text-black !p-3"
          >
            <div className="flex items-center">
              <span className="mr-1">
                View Details
              </span>

              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[1px]">
                <path d="M0.708333 8L0 7.29167L3.29167 4L0 0.708333L0.708333 0L4.70833 4L0.708333 8Z" className="fill-white group-hover:fill-black" />
              </svg>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  )
};

export default CardItem;
