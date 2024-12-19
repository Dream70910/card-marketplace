import React, { useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"; // Ensure you're using Headless UI or a similar library
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Categories',
    link: '/marketplace/categories'
  }, {
    title: 'Sell Cards',
    link: '/marketplace/create-listing'
  }, {
    title: 'Contact',
    link: '/marketplace/chat/soeyv2FdZVQ8z48ANba93YLpZOk1'
  },
  {
    title: 'FAQs',
    link: '/faqs'
  }
]

const DropdownMenu = () => {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  const onChangeSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/marketplace/categories?search=${searchText}`)
    }
  }

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-transparent py-1.5 px-3 text-sm/6 font-semibold focus:outline-none">
        <button>
          <img src="/assets/icons/icon-menu.svg" alt="" />
        </button>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-full origin-top-right !top-[96px] text-white border shadow-[2px_19px_8px_rgba(97,51,142,.01),1px_11px_7px_rgba(97,51,142,.02),0px_5px_5px_rgba(97,51,142,.03),0px_1px_3px_rgba(97,51,142,.04)] border-white/5 p-2 text-sm/6 transition duration-100 [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:top-[-999px] z-10 bg-[#141414]"
      >
        <div className="flex flex-col container mx-auto px-8">
          <div className="relative my-8  rounded-[4px] border-[rgba(255,255,255,.4)] border-[1px]">
            <input
              className="px-4 py-4 bg-transparent w-full text-primary placeholder-primary"
              placeholder="SEARCH"
              onChange={(e) => setSearchText(e.currentTarget.value)}
              onKeyDown={onChangeSearch}
            >
            </input>

            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[50%] -translate-y-1/2 right-4">
              <g clipPath="url(#clip0_772_1360)">
                <path d="M11.0109 19.2326C15.3457 19.2326 18.8598 15.7186 18.8598 11.3838C18.8598 7.04902 15.3457 3.53497 11.0109 3.53497C6.67615 3.53497 3.16211 7.04902 3.16211 11.3838C3.16211 15.7186 6.67615 19.2326 11.0109 19.2326Z" stroke="white" strokeWidth="2.09302" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5615 16.9337L21.9998 22.3719" stroke="white" strokeWidth="2.09302" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_772_1360">
                  <rect width="25.1163" height="25.1163" fill="white" transform="translate(0.0224609 0.395386)" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="mx-auto mb-8">
            <img
              className="h-[2rem] lg:min-h-[3rem]"
              src="/assets/logos/logo.svg"
              alt=""
            />
          </div>

          <div className="gradient-border mb-8" />

          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <Link to={item.link}>
                <button className="group flex justify-between w-full items-center gap-2 !border-0 hover:!border-1 py-2.5 hover:text-primary text-white font-semibold text-sm lg:text-base">
                  {item.title}

                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.18294 15.2469L0.848633 13.9126L7.04921 7.71201L0.848633 1.51143L2.18294 0.177124L9.71782 7.71201L2.18294 15.2469Z" fill="#1AB6F9" />
                  </svg>
                </button>
              </Link>
            </MenuItem>
          ))}

          <div className="gradient-border mt-8 mb-8" />

          <Link to='/marketplace/chat/all'>
            <button className="flex bg-primary w-full py-4 rounded-[4px] justify-center items-center">
              <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <mask id="mask0_772_1535" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="24">
                  <rect x="0.0332031" y="0.812561" width="22.3284" height="22.3284" fill="white" />
                </mask>
                <g mask="url(#mask0_772_1535)">
                  <path d="M7.47727 11.094C7.70505 11.094 7.89918 11.0138 8.05967 10.8535C8.22 10.693 8.30016 10.4989 8.30016 10.2711C8.30016 10.0433 8.22 9.84919 8.05967 9.6887C7.89918 9.52837 7.70505 9.44821 7.47727 9.44821C7.24949 9.44821 7.05535 9.52837 6.89487 9.6887C6.73454 9.84919 6.65437 10.0433 6.65437 10.2711C6.65437 10.4989 6.73454 10.693 6.89487 10.8535C7.05535 11.0138 7.24949 11.094 7.47727 11.094ZM11.1987 11.094C11.4264 11.094 11.6206 11.0138 11.7811 10.8535C11.9414 10.693 12.0216 10.4989 12.0216 10.2711C12.0216 10.0433 11.9414 9.84919 11.7811 9.6887C11.6206 9.52837 11.4264 9.44821 11.1987 9.44821C10.9709 9.44821 10.7767 9.52837 10.6163 9.6887C10.4559 9.84919 10.3758 10.0433 10.3758 10.2711C10.3758 10.4989 10.4559 10.693 10.6163 10.8535C10.7767 11.0138 10.9709 11.094 11.1987 11.094ZM14.9201 11.094C15.1478 11.094 15.342 11.0138 15.5025 10.8535C15.6628 10.693 15.7429 10.4989 15.7429 10.2711C15.7429 10.0433 15.6628 9.84919 15.5025 9.6887C15.342 9.52837 15.1478 9.44821 14.9201 9.44821C14.6923 9.44821 14.4981 9.52837 14.3377 9.6887C14.1773 9.84919 14.0972 10.0433 14.0972 10.2711C14.0972 10.4989 14.1773 10.693 14.3377 10.8535C14.4981 11.0138 14.6923 11.094 14.9201 11.094ZM2.36035 20.5407V4.97532C2.36035 4.50534 2.52316 4.10754 2.84878 3.78192C3.17441 3.4563 3.57221 3.29349 4.04219 3.29349H18.3551C18.8251 3.29349 19.2229 3.4563 19.5485 3.78192C19.8742 4.10754 20.037 4.50534 20.037 4.97532V15.5669C20.037 16.0369 19.8742 16.4347 19.5485 16.7603C19.2229 17.0859 18.8251 17.2487 18.3551 17.2487H5.65239L2.36035 20.5407ZM5.05836 15.8532H18.3551C18.4268 15.8532 18.4924 15.8233 18.5519 15.7636C18.6116 15.7041 18.6414 15.6385 18.6414 15.5669V4.97532C18.6414 4.90369 18.6116 4.8381 18.5519 4.77856C18.4924 4.71886 18.4268 4.68901 18.3551 4.68901H4.04219C3.97055 4.68901 3.90496 4.71886 3.84542 4.77856C3.78572 4.8381 3.75587 4.90369 3.75587 4.97532V17.1415L5.05836 15.8532Z" fill="white" />
                </g>
              </svg>

              VIEW CHATS
            </button>
          </Link>

          <div className="text-xs mt-14 pb-8 flex lg:hidden items-center justify-center 2xl:text-base leading-[1.8] w-full">
            <div className="mr-4">
              <div className="border-style-decoration bg-[#2A2A2A] p-4 w-fit cursor-pointer">
                <img
                  src="/assets/logos/instagram.svg"
                  className="max-w-[28px] lg:max-w-[unset]"
                />
              </div>
            </div>
            <div className="border-style-decoration bg-[#2A2A2A] p-4 w-fit cursor-pointer mr-4">
              <img
                src="/assets/logos/facebook.svg"
                className="max-w-[28px] lg:max-w-[unset]"
              />
            </div>
            <div className="border-style-decoration bg-[#2A2A2A] p-4 w-fit cursor-pointer">
              <img
                src="/assets/logos/x.svg"
                className="max-w-[28px] lg:max-w-[unset]"
              />
            </div>
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
