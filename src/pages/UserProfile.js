import React, { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import PersonalInformation from "../sections/user-profile/PersonalInformation"
import { Link } from "react-router-dom"

const UserProfile = () => {
  const tabs = [
    {
      title: "Personal Information",
      link: "/user-profile"
    },
    {
      title: "Purchase/Sale history",
      link: "/purchase-sale"
    },
    // {
    //   title: "Ratings and reviews",
    //   link: "/user-profile"
    // },
    {
      title: "Your Listings",
      link: "/my-listings"
    },
    {
      title: "Payment Settings",
      link: "/payment-settings"
    }
  ]

  return (
    <div>
      <Header isLogin />
      <div className="container mx-auto px-5 py-32 lg:py-48 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[80%] after:blur-[250px] after:bg-primary after:rounded-full after:absolute after:z-[1]">
        <h1 className="font-aero uppercase text-white leading-[1.2] text-[32px] lg:text-[48px]">
          User Profile
        </h1>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 lg:gap-6 my-12">
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              to={tab.link}
              className={`relative w-fit justify-center text-sm lg:text-base flex items-center p-4 px-6 whitespace-nowrap border-style-decoration after:bottom-[-.5px] right-[-.5px]
                ${tab.title === "Personal Information"
                  ? "bg-white text-black"
                  : "text-white hover:bg-white hover:text-[#141414]"
                }`}
            >
              {tab.title}
            </Link>
          ))}
        </div>

        <PersonalInformation />
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile
