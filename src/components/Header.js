import React from "react";

const Header = () => {
  const menuItems = ["AI Tools", "History", "Settings", "Log out"];

  return (
    <div className="container mx-auto px-4 py-8 w-full absolute top-0 inset-0 bg-transparent z-10">
      <div className="flex items-center justify-between w-full">
        <img
          className="h-[2rem] lg:min-h-[3rem]"
          src="/assets/logos/logo.svg"
          alt=""
        />

        <div className='hidden lg:flex gap-[2rem] font-["Manrope-Bold"] text-[1.1rem] uppercase  text-white'>
          <div className="flex items-center">
            <a href="/#">Home</a>
          </div>
          <div className="flex items-center opacity-20">
            <a href="/#">Categories</a>
          </div>
          <div className="flex items-center opacity-20">
            <a href="/#">Buy Cards</a>
          </div>
          <div className="flex items-center opacity-20">
            <a href="/#">Sell Cards</a>
          </div>
          <div className="flex items-center  opacity-20">
            <a href="/#">Contact</a>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="bg-primary-gradient flex items-center p-3 px-6 text-white border-style-decoration">
            <img
              src="/assets/icons/icon-person.svg"
              alt="icon"
              className="mr-2"
            />{" "}
            Login
          </button>
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
  );
};

export default Header;
