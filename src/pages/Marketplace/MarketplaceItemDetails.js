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

  useEffect(() => {
    getListingByID(cardId).then((item) => {
      setCard(item)
    })

    scrollTo({
      top: 0
    })
  }, [cardId])

  useEffect(() => {
    if (card && card.seller) {
      getUserData(card.seller).then((item) => {
        setSeller(item)
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
    const cartedItem = { title: item.title, price: item.price, picture: item.imageSrc, sellerId: item.sellerId, sellerUserName: item.sellerUserName, id: item.id }
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
    slidesToShow: 5,
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
        !loading ?
          <div className="container mx-auto px-5  py-24 lg:py-48 lg:pb-24 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[60%] after:blur-[250px] after:bg-primary after:rounded-full after:absolute after:z-[-1]">
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12">
              <div className="w-full max-w-[620px] 2xl:max-w-[700px]">
                {/* Main Displayed Image */}
                {/* <div className="product-ask-section w-full">
              <img
                src={activeImage.src}
                className="w-full h-full object-cover"
                alt="Main Displayed"
              />
            </div> */}

                {/* Thumbnail Slider */}
                {/* <Slider {...settings} arrows={false} className="mt-5">
                  {images.map((image) => (
                    <div key={image.id} className="px-[2px] lg:px-1">
                      <div
                        className={`cursor-pointer border-style-decoration w-full ${activeImageId === image.id
                          ? "!opacity-100 !border-primary after:!border-l-primary after:!border-t-primary before:!border-r-primary before:!border-b-primary"
                          : "opacity-40"
                          }`}
                        onClick={() => handleThumbnailClick(image.id)}
                      >
                        <img
                          src={image.src}
                          className="w-full h-full object-cover"
                          alt={`Thumbnail ${image.id}`}
                        />
                      </div>
                    </div>
                  ))}
                </Slider> */}
                <img src={card.pictures[0]} className="w-full" />
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
                        Second Owner
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
                      <img
                        src={seller.picture}
                        className=" max-w-[32px] lg:max-w-[48px] border-style-decoration object-cover"
                      />
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

                    <Link
                      to={`/marketplace/chat/${card.seller}`}
                      className="w-full !border !border-primary text-primary text-[10px] lg:text-base flex justify-center items-center p-1.5 px-3 lg:p-3 lg:px-6 border-style-decoration max-w-[130px] lg:max-w-[185px] after:!border-l-primary after:!border-t-primary before:!border-b-primary before:border-r-primary"
                    >
                      <img
                        src="/assets/icons/icon-chat.svg"
                        className="max-w-[14px] lg:max-w-[unset] mr-1 lg:mr-2 mt-1"
                      />{" "}
                      Send message
                    </Link>
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
                          <span>04 January, 2024</span>
                        </div>
                        <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Release Date
                          </span>
                          <span>12 September, 2018</span>
                        </div>
                        <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Category
                          </span>
                          <span>{categoryName}</span>
                        </div>
                        {/* <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Sub-category
                          </span>
                          <span>Pokemon</span>
                        </div> */}
                        <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Dimensions
                          </span>
                          <span>Standard trading card size</span>
                        </div>
                        <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Finish
                          </span>
                          <span>Glossy Finish</span>
                        </div>
                        <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Manufacturer
                          </span>
                          <span>TOPPS</span>
                        </div>
                        <div className="w-full flex  text-xs lg:text-sm">
                          <span className="text-primary w-full max-w-[140px] lg:max-w-[210px] block">
                            Card Number
                          </span>
                          <span>PX109276366</span>
                        </div>
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
