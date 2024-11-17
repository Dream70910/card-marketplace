import React, { useEffect, useState } from "react"
import Button from "./commons/Button"
import DropdownMenu from "./commons/DropdownMenu"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { getUserData } from "../firebase/users"

const Header = ({ isLogin = false }) => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const menuItems = ["AI Tools", "History", "Settings", "Log out"]
  const isActive = (path) => location.pathname === path
  console.log("user date is", user)

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((data) => {
        setUserData(data)
        setLoading(false)
      })
    }
  }, [user])

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    !loading &&
    <div className="relative after:content-['']  after:w-full after:absolute after:h-[100px] after:bg-[linear-gradient(to_bottom,#141414_0%,#14141400_100%)] z-10  after:pointer-events-none">
      <div className="container mx-auto px-4 py-8 w-full absolute top-0 inset-0 bg-transparent z-10 h-fit">
        <div className="flex items-center justify-between w-full">
          {/*  */}
          <div className="flex items-center lg:hidden  gap-6">
            <button>
              <img src="/assets/icons/icon-menu.svg" alt="" />
            </button>
            <button>
              <img src="/assets/icons/icon-search.svg" alt="" />
            </button>
          </div>

          <img
            className="h-[2rem] lg:min-h-[3rem]"
            src="/assets/logos/logo.svg"
            alt=""
          />

          <div className="hidden lg:flex gap-[2rem] text-[1.1rem] uppercase  text-white ">
            <div className="flex items-center text-[#484F52]">
              <Link to="/" className={isActive('/') ? 'text-white' : ''}>Home</Link>
            </div>
            <div className="flex items-center text-[#484F52]">
              <Link to="/marketplace/categories" className={isActive('/marketplace/categories') ? 'text-white' : ''}>Categories</Link>
            </div>
            <div className="flex items-center text-[#484F52]">
              <a href="/#">Buy Cards</a>
            </div>
            <div className="flex items-center text-[#484F52]">
              <a href="/#">Sell Cards</a>
            </div>
            <div className="flex items-center  text-[#484F52]">
              <a href="/#">Contact</a>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/*  */}
            <button className="lg:hidden">
              <img src="/assets/icons/icon-person.svg" alt="" />
            </button>
            {!user ? (
              <Link to="/login">
                <Button isActive divClassName="hidden lg:block">
                  <img
                    src={"/assets/icons/icon-person.svg"}
                    alt="icon"
                    className="mr-2"
                  />{" "}
                  Login
                </Button>
              </Link>
            ) : (
              <div className="hidden lg:block">
                <Menu>
                  <MenuButton className="inline-flex items-center gap-2 rounded-md bg-transparent py-1.5 px-3 text-sm/6 font-semibold focus:outline-none">
                    <div className="flex items-center relative">
                      <div className="border-style-decoration">
                        {
                          userData.picture ?
                            <img
                              src={userData.picture}
                              className="object-cover lg:w-[45px] lg:h-[45px] relative z-0"
                            /> :
                            <img
                              src="/assets/avatars/avatar.png"
                              className="object-cover lg:w-[45px] lg:h-[45px] relative z-0"
                            />
                        }
                      </div>
                      <div className="ml-4 hidden lg:flex items-center whitespace-nowrap">
                        <span className="text-base text-white">
                          {userData.displayName}
                        </span>
                        <img
                          src="/assets/icons/icon-arrow-drop-down.svg"
                          className="rotate-[180deg] ml-2"
                        />
                      </div>
                    </div>
                  </MenuButton>

                  <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 origin-top-right text-white border border-style-decoration shadow-[2px_19px_8px_rgba(97,51,142,.01),1px_11px_7px_rgba(97,51,142,.02),0px_5px_5px_rgba(97,51,142,.03),0px_1px_3px_rgba(97,51,142,.04)] border-white/5 bg-white/5 p-2 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-10"
                  >
                    <MenuItem>
                      <Link
                        to="/user-profile"
                        className="group border-style-decoration flex w-full items-center gap-2 !border-0 hover:!border-1 py-2.5 px-4 data-[focus]:bg-white hover:text-black font-semibold text-sm lg:text-base">
                        Profile Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button className="group border-style-decoration flex w-full items-center gap-2 !border-0 hover:!border-1 py-2.5 px-4 data-[focus]:bg-white hover:text-black font-semibold text-sm lg:text-base">
                        Your Listing
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="group border-style-decoration flex w-full items-center gap-2 !border-0 hover:!border-1 py-2.5 px-4 data-[focus]:bg-white hover:text-black font-semibold text-sm lg:text-base"
                        onClick={onLogout}
                      >
                        Log out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            )}

            {/*  */}
            <button className="relative">
              <span className="text-[8px] font-bold rounded-full flex items-center justify-center bg-primary text-white absolute  w-[14px] h-[14px] right-[-.25rem]  bottom-[-.25rem]">
                2
              </span>
              <img src="/assets/icons/icon-bag.svg" alt="icon" />
            </button>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  )
}

export default Header
