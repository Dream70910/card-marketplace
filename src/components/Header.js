import React, { useEffect, useState } from "react"
import Button from "./commons/Button"
import DropdownMenu from "./commons/DropdownMenu"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { getUserData } from "../firebase/users"
import { useAtom } from "jotai"
import { userAtom } from "../store"

const Header = ({ isLogin = false }) => {
  const [userData, setUserData] = useAtom(userAtom)
  const { logout, } = useAuth()
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (path) => location.pathname.includes(path)
  const isExactActive = (path) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    // <div className={`top-0 w-full z-[1000] ${isFixed ? 'fixed bg-slate-800' : 'relative'}`}>
    //   <div className="relative after:content-[''] w-full after:w-full after:absolute after:h-[100px] after:bg-[linear-gradient(to_bottom,#141414_0%,#14141400_100%)] z-10  after:pointer-events-none">
    <>
      <div className={`px-4 py-4 w-full z-[100] h-fit  fixed bg-black left-0 top-0`}>
        <div className="flex px-4 container mx-auto items-center justify-between w-full">
          {/*  */}
          <div className="flex items-center lg:hidden  gap-6">
            <DropdownMenu />
            {/* <button>
              <img src="/assets/icons/icon-menu.svg" alt="" />
            </button> */}
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
              <Link to="/" className={isExactActive('/') ? 'text-white' : ''}>Home</Link>
            </div>
            <div className="flex items-center text-[#484F52]">
              <Link to="/marketplace/categories" className={isActive('/marketplace/categories') ? 'text-white' : ''}>Categories</Link>
            </div>
            {/* <div className="flex items-center text-[#484F52]">
              <Link to="/marketplace/chat/all" className={isActive('/marketplace/chat') && !isActive('/marketplace/chat/soeyv2FdZVQ8z48ANba93YLpZOk1') ? 'text-white' : ''}>Messages</Link>

              {
                userData && userData.unReadMessages && userData.unReadMessages.length > 0 &&
                <div className="relative ml-2 bg-[#f00] rounded-[50%] w-4 h-4">
                  <span className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-[12px]">{userData.unReadMessages.length}</span>
                </div>
              }
            </div> */}
            <div className="flex items-center text-[#484F52]">
              <Link to="/marketplace/create-listing" className={isActive('/marketplace/create-listing') ? 'text-white' : ''}>Sell Cards</Link>
            </div>
            <div className="flex items-center  text-[#484F52]">
              <Link to="/faqs" className={isActive('/faqs') ? 'text-white' : ''}>FAQ</Link>
            </div>
            {
              userData && userData.role === 'admin' ?
                <div className="flex items-center  text-[#484F52]">
                  <Link to="/admin" className={isActive('/admin') ? 'text-white' : ''}>Admin</Link>
                </div> :
                <div className="flex items-center  text-[#484F52]">
                  <Link to="/marketplace/chat/soeyv2FdZVQ8z48ANba93YLpZOk1" className={isActive('/marketplace/chat/soeyv2FdZVQ8z48ANba93YLpZOk1') ? 'text-white' : ''}>Contact</Link>
                </div>
            }
          </div>

          <div className="flex items-center space-x-6">
            {/*  */}
            <button className="lg:hidden">
              <img src="/assets/icons/icon-person.svg" alt="" />
            </button>
            {!userData || !userData.cartList ?
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
              :
              <>
                <div className="hidden lg:block">
                  <Menu>
                    <MenuButton className="inline-flex items-center gap-2 rounded-md bg-transparent py-1.5 px-3 text-sm/6 font-semibold focus:outline-none">
                      <div className="flex items-center relative">
                        <div className="w-8 h-8 flex items-center justify-center  rounded-[50%] border-[2px]">
                          {/* {
                          userData.picture ?
                          <img
                              src={userData.picture}
                              className="object-cover lg:w-[45px] lg:h-[45px] relative z-0"
                            /> :
                            <img
                              src="/assets/avatars/avatar.png"
                              className="object-cover lg:w-[45px] lg:h-[45px] relative z-0"
                            />
                        } */}

                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_763_2198)">
                              <path d="M8.89618 10.0862C11.0863 10.0862 12.8617 8.31076 12.8617 6.12067C12.8617 3.93057 11.0863 2.15515 8.89618 2.15515C6.70609 2.15515 4.93066 3.93057 4.93066 6.12067C4.93066 8.31076 6.70609 10.0862 8.89618 10.0862Z" stroke="#1AB6F9" strokeWidth="1.18966" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M2.94824 13.556C4.14843 11.4822 6.32823 10.0862 8.89652 10.0862C11.4648 10.0862 13.6446 11.4822 14.8448 13.556" stroke="#1AB6F9" strokeWidth="1.18966" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                              <clipPath id="clip0_763_2198">
                                <rect width="15.8621" height="15.8621" fill="white" transform="translate(0.96582 0.172424)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="ml-4 hidden lg:flex items-center whitespace-nowrap">
                          <div>
                            <div className="text-base text-white">
                              {userData.displayName}
                            </div>
                            <div className="text-base text-left text-white">
                              $ {userData.balance.toFixed(2)}
                            </div>
                          </div>
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
                      className="w-52 origin-top-right text-white border border-style-decoration shadow-[2px_19px_8px_rgba(97,51,142,.01),1px_11px_7px_rgba(97,51,142,.02),0px_5px_5px_rgba(97,51,142,.03),0px_1px_3px_rgba(97,51,142,.04)] border-white/5 bg-white/5 p-2 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-[200]"
                    >
                      <MenuItem>
                        <Link
                          to="/user-profile"
                          className="group border-style-decoration flex w-full items-center gap-2 !border-0 hover:!border-1 py-2.5 px-4 data-[focus]:bg-white hover:text-black font-semibold text-sm lg:text-base">
                          Profile Settings
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/my-listings" className="group border-style-decoration flex w-full items-center gap-2 !border-0 hover:!border-1 py-2.5 px-4 data-[focus]:bg-white hover:text-black font-semibold text-sm lg:text-base">
                          Your Listing
                        </Link>
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

                <Link to="/marketplace/chat/all" className="relative">
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_767_3793" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="23">
                      <rect width="22.3284" height="22.3284" fill="white" />
                    </mask>
                    <g mask="url(#mask0_767_3793)">
                      <path d="M7.44406 10.2814C7.67184 10.2814 7.86598 10.2012 8.02646 10.0409C8.18679 9.88042 8.26696 9.68629 8.26696 9.45851C8.26696 9.23073 8.18679 9.0366 8.02646 8.87611C7.86598 8.71578 7.67184 8.63561 7.44406 8.63561C7.21628 8.63561 7.02215 8.71578 6.86167 8.87611C6.70134 9.0366 6.62117 9.23073 6.62117 9.45851C6.62117 9.68629 6.70134 9.88042 6.86167 10.0409C7.02215 10.2012 7.21628 10.2814 7.44406 10.2814ZM11.1655 10.2814C11.3932 10.2814 11.5874 10.2012 11.7479 10.0409C11.9082 9.88042 11.9884 9.68629 11.9884 9.45851C11.9884 9.23073 11.9082 9.0366 11.7479 8.87611C11.5874 8.71578 11.3932 8.63561 11.1655 8.63561C10.9377 8.63561 10.7435 8.71578 10.5831 8.87611C10.4227 9.0366 10.3426 9.23073 10.3426 9.45851C10.3426 9.68629 10.4227 9.88042 10.5831 10.0409C10.7435 10.2012 10.9377 10.2814 11.1655 10.2814ZM14.8869 10.2814C15.1146 10.2814 15.3088 10.2012 15.4692 10.0409C15.6296 9.88042 15.7097 9.68629 15.7097 9.45851C15.7097 9.23073 15.6296 9.0366 15.4692 8.87611C15.3088 8.71578 15.1146 8.63561 14.8869 8.63561C14.6591 8.63561 14.4649 8.71578 14.3045 8.87611C14.1441 9.0366 14.064 9.23073 14.064 9.45851C14.064 9.68629 14.1441 9.88042 14.3045 10.0409C14.4649 10.2012 14.6591 10.2814 14.8869 10.2814ZM2.32715 19.7282V4.16273C2.32715 3.69275 2.48996 3.29495 2.81558 2.96933C3.1412 2.64371 3.539 2.4809 4.00899 2.4809H18.3219C18.7919 2.4809 19.1897 2.64371 19.5153 2.96933C19.841 3.29495 20.0038 3.69275 20.0038 4.16273V14.7543C20.0038 15.2243 19.841 15.6221 19.5153 15.9477C19.1897 16.2733 18.7919 16.4361 18.3219 16.4361H5.61919L2.32715 19.7282ZM5.02516 15.0406H18.3219C18.3936 15.0406 18.4592 15.0107 18.5187 14.9511C18.5784 14.8915 18.6082 14.8259 18.6082 14.7543V4.16273C18.6082 4.0911 18.5784 4.02551 18.5187 3.96596C18.4592 3.90627 18.3936 3.87642 18.3219 3.87642H4.00899C3.93735 3.87642 3.87176 3.90627 3.81222 3.96596C3.75252 4.02551 3.72267 4.0911 3.72267 4.16273V16.3289L5.02516 15.0406Z" fill="white" />
                    </g>
                  </svg>

                  {
                    userData && userData.unReadMessages && userData.unReadMessages.length > 0 &&
                    <span className="text-[8px] font-bold rounded-full flex items-center justify-center bg-primary text-white absolute  w-[14px] h-[14px] right-[-.25rem]  bottom-[-.25rem]">
                      {userData.unReadMessages.length}
                    </span>
                  }
                </Link>

                {/*  */}
                <Link to="/purchase-sale" className="relative" >
                  <span className="text-[8px] font-bold rounded-full flex items-center justify-center bg-primary text-white absolute  w-[14px] h-[14px] right-[-.25rem]  bottom-[-.25rem]">
                    {userData.cartList ? userData.cartList.length : 0}
                  </span>
                  <img src="/assets/icons/icon-bag.svg" alt="icon" />
                </Link>
              </>
            }
            {/* <span className="text-[16px] justify-center text-white">
              $ {userData.balance}
            </span> */}
          </div>

          {/*  */}
        </div>
      </div >
    </>
  )
}

export default Header
