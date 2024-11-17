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
  const { user } = useAuth()
  const [userData, setUserData] = useAtom(userAtom)

  useEffect(() => {
    userData && userData.cartList && isListingInCart()
  }, [userData])

  const isListingInCart = () => {
    if (userData.cartList.findIndex(item => item.id === cardId) > -1) setIsInCart(true)
    else setIsInCart(false)
  }

  const handleAddtoCart = (e) => {
    e.preventDefault()
    toast.success(`${title} was successfully added to cart !`)

    const cartedItem = { title: title, price: price, picture: imageSrc, sellerId: sellerId, sellerUserName: sellerUserName, id: cardId }

    addToCart(user.uid, cartedItem)

    setUserData({ ...userData, cartList: [...userData.cartList, cartedItem] })
    setIsInCart(true)
  }

  return (
    <Link
      className={`p-3 lg:p-5 flex flex-col card-item w-full min-w-[160px] lg:min-h-[500px] bg-white/5 backdrop-blur-sm ${cardClassName}`}
      to={`/marketplace/${cardId}`}
    >
      <div className="relative">
        <img
          src={imageSrc || "/assets/images/image_item_default.png"}
          alt={title}
          className={`border-style-decoration w-full object-cover max-h-[250px] ${imageClassName}`}
        />
        {isRare && (
          <span className="text-white p-2 px-4 bg-primary-gradient absolute top-2 right-2  font-aero uppercase text-[8px] lg:text-xs">
            Rare find
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col justify-between h-full gap-6">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`text-sm lg:text-2xl uppercase font-aero text-white leading-[1.4] ${titleClassName}`}
            >
              {title} {quantity}
            </h4>
            <span
              className={`text-[10px] lg:text-base text-primary uppercase font-aero ${priceClassName}`}
            >
              {
                typeof price === 'number' ?
                  '$' + price.toFixed(2) : price
              }
            </span>
          </div>
          <p
            className={`text-white/60 text-[10px] lg:text-sm mt-3 font-light ${descriptionClassName}`}
          >
            {description}
          </p>
        </div>

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
      </div>
    </Link>
  )
};

export default CardItem;
