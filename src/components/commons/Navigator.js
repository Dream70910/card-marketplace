import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import DialogConfirmation from "../dialogs/DialogConfirmation"
import { useAuth } from "../../context/authContext"
import { getUserData } from "../../firebase/users"

const Navigator = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [openDialog, setOpenDialog] = useState(null)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((data) => {
        setUserData(data)
        setLoading(false)

        // if (userData.role !== 'admin')
        //   navigate('/')
      })
    }
  }, [user])

  const toggleNavigator = () => {
    setIsVisible(!isVisible)
  }

  return (
    !loading && <div>
      <DialogConfirmation
        open={openDialog === "error"}
        onClose={() => setOpenDialog(null)}
        type="failed"
        title="Failed"
        message="Your booking could not be completed due to error from payment getaway"
        buttonText="Try Again"
        onButtonClick={() => setOpenDialog(null)}
      />
      <DialogConfirmation
        open={openDialog === "loading"}
        onClose={() => setOpenDialog(null)}
        type="loading"
        title="Please wait"
        message="We are processing your booking request. Please wait and don’t close this page"
        buttonText="Cancel"
        onButtonClick={() => setOpenDialog(null)}
      />
      <div
        className={`text-xs lg:text-sm space-y-3 border border-[#E4DDF6] font-semibold fixed left-[-1rem]  bg-[rgba(255,255,255,0.6)] backdrop-blur-md top-[5%] rounded-[2rem] p-[1rem] pl-[2rem] z-[9999999] transition-transform duration-300 ${isVisible ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/marketplace">Marketplace</Link>
        </div>
        <div>
          <Link to="/marketplace/categories">Categories</Link>
        </div>
        <div>
          <Link to="/marketplace/KgkmQaHPnetSAnJTiGR9">Listing</Link>
        </div>
        <div>
          <Link to="/marketplace/create-listing">Create Listing</Link>
        </div>
        <div>
          <Link to="/marketplace/chat/cLl3mlk45qgwa1yuustQygeEeYD2">Chat</Link>
        </div>
        <div>
          <Link to="/support">Support</Link>
        </div>
        <div>
          <Link to="/tickets">Tickets</Link>
        </div>
        <div>
          <Link to="/user-profile">User Profile</Link>
        </div>
        <div>
          <Link to="/faq">Faqs</Link>
        </div>
        {
          userData.role === 'admin' && <div>
            <Link to="/admin">Admin</Link>
          </div>
        }
        <div>
          <button onClick={() => setOpenDialog("error")}>Dialog Failed</button>
        </div>
        <div>
          <button onClick={() => setOpenDialog("loading")}>
            Dialog Loading
          </button>
        </div>
      </div>

      <button
        onClick={toggleNavigator}
        className="fixed left-0 top-[5%] translate-y-[-120%] bg-none border-none cursor-pointer z-[9999999]"
      >
        <img
          src="/assets/icons/chevron-left.svg" // Replace with the actual image path
          alt="Show Navigator"
          className={`w-[30px] h-[30px] transition ${!isVisible ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>
    </div >
  )
}

export default Navigator
