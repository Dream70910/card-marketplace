import React from "react";
import TextInput from "../../components/commons/TextInput";
import Button from "../../components/commons/Button";
import Dropdown from "../../components/commons/Dropdown";

const HeroSection = () => {
  const options = [
    { value: "", label: "Filter By" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleDropdownChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="py-24 lg:py-48">
      <div className="container px-5 mx-auto relative after:content-[''] after:w-[360px] after:left-[100%] after:h-[360px] after:bottom-[90%] after:blur-[200px] after:bg-primary after:rounded-full after:absolute after:z-[1]">
        <div className="text-white product-ask-section bg-white/5 backdrop-blur-md flex">
          <div className="flex flex-col w-full p-10 lg:p-20">
            <h2 className="uppercase font-aero text-center lg:text-left text-[32px] lg:text-[48px]  leading-[1.1]">
              Buy, Sell, and
              <span className="gradient-text font-aero">
                <br />
                Trade with Ease
              </span>
            </h2>
            <p className="w-full text-xs lg:text-base text-center mt-5 lg:text-left max-w-[370px] opacity-60 font-light">
              From rare finds to the latest releases, we provide a space where
              enthusiasts can buy, sell, and exchange cards with confidence.
            </p>
            <div className="mt-6 flex items-center space-x-4 w-full  ">
              {/* <img
            src="/assets/decorations/homepage_decoration_9.png"
            className="absolute top-[-2rem] pointer-events-none w-[700px]"
          /> */}
              {/* <div className="absolute pointer-events-none w-[360px] h-[360px] bg-primary blur-[300px] rounded-full left-[50%] translate-x-[-50%] bottom-[100%]" /> */}
              <Dropdown
                options={options}
                placeholder="Filter by"
                onChange={handleDropdownChange}
                className="max-w-[150px]"
              />
              <TextInput placeholder="Search for cards" />
              <Button isActive>Explore</Button>
            </div>
          </div>

          {/*  */}
          <div>
            {/* <div className="h-[480px] w-full max-w-[480px] bg-primary-gradient"></div> */}
            {/* <img src="/assets/decorations/marketplace_decoration.png" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
