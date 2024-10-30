import React from "react";

const Footer = () => {
  return (
    <div className="container p-4 mx-auto flex flex-col items-center justify-between text-white">
      <div className="flex flex-col items-center lg:items-stretch justify-between space-y-10 lg:space-y-0 lg:flex-row lg:justify-between w-full">
        <div className="flex flex-col w-full max-w-[350px] justify-between">
          <img
            className="w-full max-w-[315.07px]"
            src="/assets/logos/logo.svg"
            alt=""
          />
        </div>

        <div className="flex items-start w-full max-w-[670px]">
          <div className="w-full ">
            <h4 className="text-base 2xl:text-xl text-white/60 mb-10 whitespace-nowrap">
              Navigation
            </h4>
            <ul className="text-xs 2xl:text-base space-y-6 leading-[1.8]">
              <li>Home</li>
              <li>Categories</li>
              <li>Sell Cards</li>
            </ul>
          </div>
          <div className="w-full ">
            <h4 className="text-base 2xl:text-xl text-white/60 mb-10 whitespace-nowrap">
              Resources
            </h4>
            <ul className="text-xs 2xl:text-base space-y-6 leading-[1.8]">
              <li>FAQs</li>
              <li>Contact</li>
              <li>Log In</li>
            </ul>
          </div>
          <div className="w-full ">
            <div className="text-xs flex flex-col items-end justify-end 2xl:text-base space-y-6 leading-[1.8]">
              <div className="flex gap-6">
                <div className="border-style-decoration bg-primary-gradient p-6 w-fit cursor-pointer">
                  <img src="/assets/logos/facebook.svg" />
                </div>
                <div className="border-style-decoration bg-primary-gradient p-6 w-fit cursor-pointer">
                  <img src="/assets/logos/x.svg" />
                </div>
              </div>
              <div>
                <div className="border-style-decoration bg-primary-gradient p-6 w-fit cursor-pointer">
                  <img src="/assets/logos/instagram.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="flex lg:hidden mx-auto items-center divide-x">
          <li className="px-4 pl-0">
            <img
              src="/assets/logos/linkedin.svg"
              className="w-[20px] h-[20px]"
              alt=""
            />
          </li>
          <li className="px-4">
            <img
              src="/assets/logos/youtube.svg"
              className="w-[20px] h-[20px] "
              alt=""
            />
          </li>
          <li className="px-4">
            <img
              src="/assets/logos/instagram.svg"
              className="w-[20px] h-[20px] "
              alt=""
            />
          </li>
        </ul>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:justify-between mt-32 pb-[3rem]">
        <span className="text-white/60 font-light text-xs lg:text-sm inline-block  mr-[-1rem]">
          © 2024 Card Shop Exchange
        </span>
        <div className="flex gap-24">
          <span className="text-white/60 font-light text-xs lg:text-sm">
            Privacy Policy
          </span>
          <span className="text-white/60 font-light text-xs lg:text-sm inline-block">
            Terms of service
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
