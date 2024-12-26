import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import HeroSection from "../sections/home/HeroSection"
import HottestCategorySection from "../sections/home/HottestCategorySection"
import ProductQuestionSection from "../sections/home/ProductQuestionSection"
import NewlyListedSection from "../sections/home/NewlyListedSection"
import KeyFeaturesSection from "../sections/home/KeyFeaturesSection"
import MostPopularSection from "../sections/home/MostPopularSection"
import Footer from "../components/Footer"
import { getAllCategories } from "../firebase/categories"
import { getAllListings } from "../firebase/listings"
import { useAtom } from "jotai"
import { userAtom } from "../store"
import DialogConfirmation from "../components/dialogs/DialogConfirmation"
import MembershipSection from "../sections/home/MembershipSection"

const Home = () => {
  const [categories, setCatgories] = useState(null)
  const [cards, setCards] = useState(null)
  const [userData, setUserData] = useAtom(userAtom)
  const [loading1, setLoaindg1] = useState(true)
  const [loading2, setLoaindg2] = useState(true)

  useEffect(() => {
    const userId = userData && userData.id ? userData.id : null

    getAllCategories().then(items => {
      setCatgories(items)
      setLoaindg1(false)
    })

    getAllListings(userId).then(items => {
      setCards(items)
      setLoaindg2(false)
    })
  }, [userData])

  return (
    <div>
      <Header />

      {
        loading1 && loading2 ?
          <DialogConfirmation
            open={loading1 && loading2}
            onClose={() => { }}
            type="loading"
            title="Please wait"
            message="We are processing your booking request. Please wait and don’t close this page"
          /> :
          <>
            <HeroSection />

            <div className="pt-20 max-lg:pb-20 lg:pt-40 ">
              <HottestCategorySection categories={categories} />
              {/* <MembershipSection /> */}
              <ProductQuestionSection />
              <NewlyListedSection categories={categories} cards={cards} />
              <KeyFeaturesSection />
              {/* <MostPopularSection cards={cards} /> */}
            </div>
          </>
      }

      <Footer />
    </div>
  )
}

export default Home
