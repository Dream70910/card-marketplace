import React, { useEffect, useState } from "react"
import { Link, useActionData, useParams } from 'react-router-dom'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Button from "../../components/commons/Button"
import CardItem from "../../components/cards/CardItem"
import Slider from "react-slick"
import { addToCart, buyListing, getListingByID, getListingsByUserId, removeFromCart } from "../../firebase/listings"
import DialogConfirmation from "../../components/dialogs/DialogConfirmation"
import { getUserData } from "../../firebase/users"
import { getCategoryById } from "../../firebase/categories"
import { toast } from "react-toastify"
import { useAtom } from "jotai"
import { userAtom } from "../../store"
import { brands } from "../../utils/data"

const MarketplaceItemDetails = () => {
  const [openDetails, setOpenDetails] = useState(true)
  const [openDelivery, setOpenDelivery] = useState(false)
  const [openPayments, setOpenPayments] = useState(false)
  const { cardId } = useParams()
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [seller, setSeller] = useState(null)
  const [categoryName, setCategoryName] = useState(null)
  const [userData, setUserData] = useAtom(userAtom)
  const [isInCart, setIsInCart] = useState(false)
  const [otherCards, setOtherCards] = useState([])
  const [brand, setBrand] = useState(null)
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    getListingByID(cardId).then((item) => {
      setCard(item)
      setActiveImage(item.pictures[0])
    })

    scrollTo({
      top: 0
    })
  }, [cardId])

  useEffect(() => {
    if (card && card.seller) {
      if (card.brand) {
        const temp = brands.find(item => item.value === card.brand)
        setBrand(temp.label)
      }

      getUserData(card.seller).then((item) => {
        setSeller(item)
      })

      getCategoryById(card.category).then((item) => {
        setCategoryName(item.name)
      })

      getCategoryById(card.category).then((item) => {
        setCategoryName(item.name)
      })

      getListingsByUserId(card.seller).then((items) => {
        setOtherCards(items)
        setLoading(false)
      })
    }
  }, [card])

  useEffect(() => {
    userData && userData.cartList && isListingInCart()
  }, [userData])

  const isListingInCart = () => {
    if (userData.cartList.findIndex(item => item.id === cardId) > -1) setIsInCart(true)
    else setIsInCart(false)
  }

  const handleAddtoCart = async (item) => {
    const cartedItem = { title: item.title, price: item.price, picture: item.pictures[0], sellerId: item.sellerId, sellerUserName: item.sellerUserName, id: item.id }
    await addToCart(userData.id, cartedItem)

    toast.success(`${item.title} was successfully added to cart !`)

    setUserData({ ...userData, cartList: [...userData.cartList, cartedItem] })
    setIsInCart(true)
  }

  const removeItemFromCart = async (card) => {
    await removeFromCart(userData.id, card.id)
    const oldCart = userData.cartList.reduce((acc, cur) => {
      if (cur.id !== card.id) acc.push(cur)
      return acc
    }, [])

    setUserData({ ...userData, cartList: oldCart })
    setIsInCart(false)
  }

  const handleRemoveFromCart = async () => {
    await removeItemFromCart(card)
    toast.success(`${card.title} was removed from cart !`)
  }

  const handleBuyCard = () => {
    if (userData.balance < card.price) {
      toast.error(`Your balance is not enough !`)
    } else {
      toast.success(`${card.title} is on pending !`)
      setUserData({ ...userData, balance: userData.balance - card.price })
      removeItemFromCart(card)
      buyListing(userData.id, card)
    }
  }

  // State to track the active image ID, initialized to the first image ID
  // const [activeImageId, setActiveImageId] = useState(images[0].id)

  // Function to handle clicking on a thumbnail image
  // const handleThumbnailClick = (id) => {
  //   setActiveImageId(id)
  // }

  // Find the currently active image object
  // const activeImage = images.find((image) => image.id === activeImageId)
  const activeImageId = 1

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  return (
    <div>
      <Header isLogin />

      <DialogConfirmation
        open={loading}
        onClose={() => { }}
        type="loading"
        title="Please wait"
        message="We are processing your booking request. Please wait and don’t close this page"
        buttonText="Cancel"
        onButtonClick={() => setOpenDialog(null)}
      />

      {
        !loading && seller ?
          <div className="container mx-auto px-5  py-24 lg:py-48 lg:pb-24 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[60%] after:blur-[250px] after:bg-primary after:rounded-full after:absolute after:z-[-1]">
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12">
              <div className="w-full max-w-[620px] 2xl:max-w-[700px]">
                {/* Main Displayed Image */}
                <div className="product-ask-section w-full pt-[100%]">
                  <img
                    src={activeImage}
                    className="absolute top-0 w-full h-full object-cover"
                    alt="Main Displayed"
                  />
                </div>

                {/* Thumbnail Slider */}
                <Slider {...settings} arrows={false} className="mt-5">
                  {card.pictures.map((image) => (
                    <div key={`thumb-${image}`} className="px-[2px] lg:px-1">
                      <div
                        className={`cursor-pointer border-style-decoration w-full pt-[100%] ${activeImage === image
                          ? "!opacity-100 !border-primary after:!border-l-primary after:!border-t-primary before:!border-r-primary before:!border-b-primary"
                          : "opacity-40"
                          }`}
                        onClick={() => setActiveImage(image)}
                      >
                        <img
                          src={image}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          alt={`Thumbnail ${image}`}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="w-full lg:space-y-8">
                <div className="w-full flex items-center justify-between">
                  <span className="lg:hidden mb-4 rounded-full px-4 py-2 text-xs lg:text-sm text-primary bg-primary/20 border border-primary">
                    Platinum Edition
                  </span>
                </div>

                <h1 className="font-aero uppercase text-white leading-[1.2] text-[32px] lg:text-[48px]">
                  {card.title}
                </h1>

                <div className="w-full flex items-center justify-between mt-2 lg:mt-0">
                  <span className="gradient-text text-[24px] lg:text-[32px] font-aero ">
                    ${card.price.toFixed(2)}
                  </span>
                  <span className="hidden lg:block  rounded-full px-4 py-2 text-xs lg:text-sm text-primary bg-primary/20 border border-primary">
                    Platinum Edition
                  </span>
                </div>

                <p className="text-white mt-4 lg:mt-0">
                  {card.description}
                </p>

                <div className="flex items-center justify-between gap-3 my-5 lg:my-[unset]">
                  <div className="flex items-center gap-3 lg:gap-6">
                    <div className="border-style-decoration bg-white/5 !border-none backdrop-blur-sm p-3 lg:p-4 w-fit">
                      <img
                        src="/assets/icons/icon-bookmark.svg"
                        className="max-w-[16px] lg:max-w-[unset]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] leading-[1.4] lg:text-sm text-primary">
                        Condition
                      </span>
                      <span className="text-[10px] leading-[1.4] lg:text-sm text-white block mt-1">
                        Used
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 lg:gap-6">
                    <div className="border-style-decoration bg-white/5 !border-none backdrop-blur-sm p-3 lg:p-4 w-fit">
                      <img
                        src="/assets/icons/icon-user-circle.svg"
                        className="max-w-[16px] lg:max-w-[unset]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] leading-[1.4] lg:text-sm text-primary">
                        Owner
                      </span>
                      <span className="text-[10px] leading-[1.4] lg:text-sm text-white block mt-1">
                        {card.sellerUserName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 lg:gap-6">
                    <div className="border-style-decoration bg-white/5 !border-none backdrop-blur-sm p-3 lg:p-4 w-fit">
                      <img
                        src="/assets/icons/icon-diamond.svg"
                        className="max-w-[16px] lg:max-w-[unset]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] leading-[1.4] lg:text-sm text-primary">
                        Rarity
                      </span>
                      <span className="text-[10px] leading-[1.4] lg:text-sm text-white block mt-1">
                        Common
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full border border-[#FFFFFF]/20 p-3 lg:p-5 border-style-decoration mb-5">
                  <div className="w-full flex items-center justify-between pb-3 border-b border-b-[#fff]/20">
                    <span className="font-aero uppercase text-base lg:text-xl text-white">
                      Seller
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {/* <img
                      src="/assets/icons/icon-star-fill.svg"
                      className="max-w-[14px] lg:max-w-[unset]"
                    />
                    <img
                      src="/assets/icons/icon-star-fill.svg"
                      className="max-w-[14px] lg:max-w-[unset]"
                    />
                    <img
                      src="/assets/icons/icon-star-fill.svg"
                      className="max-w-[14px] lg:max-w-[unset]"
                    />
                    <img
                      src="/assets/icons/icon-star-fill.svg"
                      className="max-w-[14px] lg:max-w-[unset]"
                    />
                    <img
                      src="/assets/icons/icon-star-fill.svg"
                      className="max-w-[14px] lg:max-w-[unset]"
                    /> */}
                      </div>
                      <span className="text-xs lg:text-sm text-white block">
                        4.5
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 flex items-center justify-between">
                    <div className="flex items-center space-x-2 lg:space-x-4">
                      {/* <img
                        src={seller.picture}
                        className=" max-w-[32px] lg:max-w-[48px] border-style-decoration object-cover"
                      /> */}

                      <div className="bg-primary w-10 h-10 flex justify-center items-center">
                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_772_194)">
                            <mask id="mask0_772_194" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="11">
                              <path d="M7.28144 8.14928L5.29655 10.4669H1.73101C0.779557 10.4669 0.000976562 9.68847 0.000976562 8.73702V7.00699H3.70436L5.0038 5.48985L7.28155 8.14938L7.28144 8.14928ZM5.0037 4.97716L3.70426 3.45993H0.000976562V1.73C0.000976562 0.778448 0.779455 -3.05176e-05 1.73101 -3.05176e-05H5.29655L7.28144 2.31764L5.0037 4.97716Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_772_194)">
                              <path d="M7.28144 -3.05176e-05H0.000976562V10.4668H7.28144V-3.05176e-05Z" fill="#151415" />
                            </g>
                            <mask id="mask1_772_194" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="5" y="0" width="10" height="11">
                              <path d="M9.77717 5.23349L11.296 3.45996H14.9994V1.73003C14.9994 0.778478 14.2209 0 13.2694 0H9.70385L7.46277 2.61674L5.22168 5.23349L7.46277 7.85023L9.70385 10.467H13.2694C14.2208 10.467 14.9994 9.6885 14.9994 8.73705V7.00712H11.296L9.77717 5.23359V5.23349Z" fill="white" />
                            </mask>
                            <g mask="url(#mask1_772_194)">
                              <path d="M14.9994 0H5.22168V10.4669H14.9994V0Z" fill="white" />
                            </g>
                            <path opacity="0.15" fillRule="evenodd" clipRule="evenodd" d="M5.00275 4.58248L6.94241 2.3177L5.17746 0.256836H1.73006C0.920237 0.256836 0.256836 0.920237 0.256836 1.73006V3.20329H3.82156L5.00275 4.58258V4.58248Z" fill="#151415" />
                          </g>
                          <defs>
                            <clipPath id="clip0_772_194">
                              <rect width="15" height="10.4669" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>

                      <div className="flex flex-col items-start">
                        <span className="text-sm lg:text-base text-white">
                          {seller.displayName}
                        </span>
                        <div className="text-[10px] lg:text-base flex items-center text-primary">
                          <img
                            src="/assets/icons/icon-verified.svg"
                            className="max-w-[12px] lg:max-w-[unset] mr-1 lg:mr-2"
                          />{" "}
                          Verified
                        </div>
                      </div>
                    </div>

                    {
                      card.seller !== userData.id ?
                        <Link
                          to={`/marketplace/chat/${card.seller}`}
                          className="w-full !border !border-primary text-white text-[10px] lg:text-base flex justify-center items-center p-1.5 px-3 lg:p-3 lg:px-6 border-style-decoration max-w-[130px] lg:max-w-[185px] after:!border-l-primary after:!border-t-primary before:!border-b-primary before:border-r-primary"
                        >
                          {/* <img
                            src="/assets/icons/icon-chat.svg"
                            className="max-w-[14px] lg:max-w-[unset] mr-1 lg:mr-2 mt-1"
                          />{" "} */}
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 mt-1">
                            <path d="M5.33957 6.94483C5.53675 6.94483 5.7048 6.87543 5.84372 6.73664C5.98251 6.59772 6.0519 6.42967 6.0519 6.23249C6.0519 6.03532 5.98251 5.86727 5.84372 5.72835C5.7048 5.58956 5.53675 5.52016 5.33957 5.52016C5.1424 5.52016 4.97435 5.58956 4.83542 5.72835C4.69664 5.86727 4.62724 6.03532 4.62724 6.23249C4.62724 6.42967 4.69664 6.59772 4.83542 6.73664C4.97435 6.87543 5.1424 6.94483 5.33957 6.94483ZM8.56097 6.94483C8.75814 6.94483 8.92619 6.87543 9.06511 6.73664C9.2039 6.59772 9.2733 6.42967 9.2733 6.23249C9.2733 6.03532 9.2039 5.86727 9.06511 5.72835C8.92619 5.58956 8.75814 5.52016 8.56097 5.52016C8.36379 5.52016 8.19574 5.58956 8.05682 5.72835C7.91803 5.86727 7.84863 6.03532 7.84863 6.23249C7.84863 6.42967 7.91803 6.59772 8.05682 6.73664C8.19574 6.87543 8.36379 6.94483 8.56097 6.94483ZM11.7824 6.94483C11.9795 6.94483 12.1476 6.87543 12.2865 6.73664C12.4253 6.59772 12.4947 6.42967 12.4947 6.23249C12.4947 6.03532 12.4253 5.86727 12.2865 5.72835C12.1476 5.58956 11.9795 5.52016 11.7824 5.52016C11.5852 5.52016 11.4171 5.58956 11.2782 5.72835C11.1394 5.86727 11.07 6.03532 11.07 6.23249C11.07 6.42967 11.1394 6.59772 11.2782 6.73664C11.4171 6.87543 11.5852 6.94483 11.7824 6.94483ZM0.910156 15.1223V1.64825C0.910156 1.24142 1.05109 0.897063 1.33296 0.615191C1.61484 0.333319 1.95919 0.192383 2.36602 0.192383H14.7559C15.1627 0.192383 15.5071 0.333319 15.789 0.615191C16.0708 0.897063 16.2118 1.24142 16.2118 1.64825V10.8167C16.2118 11.2236 16.0708 11.5679 15.789 11.8498C15.5071 12.1317 15.1627 12.2726 14.7559 12.2726H3.75988L0.910156 15.1223ZM3.24567 11.0646H14.7559C14.8179 11.0646 14.8747 11.0387 14.9262 10.9871C14.9779 10.9355 15.0038 10.8788 15.0038 10.8167V1.64825C15.0038 1.58624 14.9779 1.52946 14.9262 1.47792C14.8747 1.42624 14.8179 1.40041 14.7559 1.40041H2.36602C2.30401 1.40041 2.24724 1.42624 2.19569 1.47792C2.14402 1.52946 2.11818 1.58624 2.11818 1.64825V12.1798L3.24567 11.0646Z" fill="white" />
                          </svg>

                          Send message
                        </Link> : ""
                    }
                  </div>
                </div>
                {
                  card.seller !== userData.id &&
                  <>
                    {
                      isInCart ?
                        <button
                          className="hover:bg-white relative w-full hover:text-[#141414] justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
                          onClick={handleRemoveFromCart}
                        >
                          Remove from Cart
                        </button>
                        :
                        <button
                          className="hover:bg-white relative w-full hover:text-[#141414] justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
                          onClick={() => handleAddtoCart(card)}
                        >
                          Add to Cart
                        </button>
                    }
                    <Button isActive divClassName="!mt-3 lg:!mt-5" onClick={handleBuyCard}>
                      Buy Now
                    </Button>
                  </>
                }

                <div className="mt-6">
                  <div
                    className="w-full flex justify-between items-center cursor-pointer pb-4 mb-4 border-b border-b-white/20"
                    onClick={() => setOpenDetails(!openDetails)}
                  >
                    <span className="text-white font-aero uppercase text-2xl">
                      Details
                    </span>
                    <img
                      src="/assets/icons/icon-arrow-drop-down.svg"
                      className={`${openDetails ? "rotate-180" : ""}`}
                    />
                  </div>

                  {openDetails && (
                    <div className="text-white w-full">
                      <p className="text-xs lg:text-base opacity-60">
                        Dive into the world of collectible card trading with the
                        Pecharunt , a highly sought after card for any dedicated
                        collector or player.
                      </p>

                      <div className="w-full space-y-4  mt-6">
                        <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Posted on
                          </span>
                          <span>{card.creatd_at}</span>
                        </div>
                        {/* <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Release Date
                          </span>
                          <span>12 September, 2018</span>
                        </div> */}
                        <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Category
                          </span>
                          <span>{categoryName}</span>
                        </div>
                        {
                          brand &&
                          <div className="w-full flex  text-xs lg:text-sm">
                            <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                              Brand
                            </span>
                            <span>{brand}</span>
                          </div>
                        }
                        {/* <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Sub-category
                          </span>
                          <span>Pokemon</span>
                        </div> */}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div
                    className="w-full flex justify-between items-center cursor-pointer pb-4 mb-4 border-b border-b-white/20"
                    onClick={() => setOpenDelivery(!openDelivery)}
                  >
                    <span className="text-white font-aero uppercase text-2xl">
                      Delivery & returns
                    </span>
                    <img
                      src="/assets/icons/icon-arrow-drop-down.svg"
                      className={`${openDelivery ? "rotate-180" : ""}`}
                    />
                  </div>

                  {openDelivery && (
                    <div className="text-white w-full">
                      <p className="text-xs lg:text-base opacity-60">
                        Dive into the world of collectible card trading with the
                        Pecharunt , a highly sought after card for any dedicated
                        collector or player.
                      </p>

                      <div className="w-full space-y-4  mt-6">
                        <div className="w-full flex">
                          <img
                            src="/assets/icons/icon-check-circle.svg"
                            className="w-full mr-3 max-w-[18px] lg:max-w-[unset] lg:w-[unset]"
                          />
                          <span className="text-xs lg:text-base">
                            Free shipping on all US orders over $50 for registered
                            users.
                          </span>
                        </div>
                        <div className="w-full flex">
                          <img
                            src="/assets/icons/icon-check-circle.svg"
                            className="w-full mr-3 max-w-[18px] lg:max-w-[unset] lg:w-[unset]"
                          />
                          <span className="text-xs lg:text-base">
                            Please allow for 2-4 business days for processing.
                          </span>
                        </div>
                        <div className="w-full flex">
                          <img
                            src="/assets/icons/icon-check-circle.svg"
                            className="w-full mr-3 max-w-[18px] lg:max-w-[unset] lg:w-[unset]"
                          />
                          <span className="text-xs lg:text-base">
                            For trading cards and sticker items, we have a no-return
                            policy in place.
                          </span>
                        </div>

                        <span className="text-xs lg:text-base block text-primary">
                          For guest users
                        </span>

                        <div className="flex items-center gap-4">
                          <div className="border-style-decoration bg-white/5 !border-none backdrop-blur-sm p-4 w-fit">
                            <img
                              src="/assets/icons/icon-package.svg"
                              className="max-w-[16px] lg:max-w-[unset]"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs leading-[1.4] lg:text-base text-white/60 block mt-1">
                              Delivery in 4-5 days with $1.20
                              <br /> shipping charges
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div
                    className="w-full flex justify-between items-center cursor-pointer pb-4 mb-4 border-b border-b-white/20"
                    onClick={() => setOpenPayments(!openPayments)}
                  >
                    <span className="text-white font-aero uppercase text-2xl">
                      Payments
                    </span>
                    <img
                      src="/assets/icons/icon-arrow-drop-down.svg"
                      className={`${openPayments ? "rotate-180" : ""}`}
                    />
                  </div>

                  {openPayments && (
                    <div className="text-white w-full">
                      <p className="text-xs lg:text-base opacity-60">
                        We accept all major credit and debit cards, including Visa,
                        Mastercard, and American Express.
                      </p>

                      <img
                        src="/assets/images/payment_lists.png"
                        className="mt-5 max-w-[230px] lg:max-w-[unset]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* list */}
            <div className="flex items-end md:items-center  justify-between mt-24">
              <h2 className="uppercase font-aero text-[32px] lg:text-[42px] leading-[1.4] text-white">
                more from this seller
                {/* featured <br className="md:hidden" /> listings */}
              </h2>

              {/* <div className="flex items-center gap-4">
          <button className="hover:bg-white w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
            View All
        </button>
        </div> */}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
              {
                otherCards.map(item =>
                  <CardItem
                    imageSrc={item.pictures[0]}
                    title={item.title}
                    price={`$ ${item.price}`}
                    description={item.description}
                    key={item.id}
                    cardId={item.id}
                  />
                )
              }
            </div>
            {/* <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
              <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
                Load More
              </button>
            </div> */}
          </div> : ""
      }
      <Footer />
    </div>
  )
}

export default MarketplaceItemDetails
