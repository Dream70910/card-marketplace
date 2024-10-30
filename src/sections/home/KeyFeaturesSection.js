import React from "react";
import Button from "../../components/commons/Button";

const KeyFeaturesSection = () => {
  return (
    <div className="container mx-auto pb-48 text-white">
      <div className="flex justify-between items-center">
        <div className="w-full">
          <h2 className="uppercase font-aero text-[72px]  leading-[1.1]">
            Key <br />
            Features
          </h2>
          <p className="w-full  opacity-60 font-light my-6">
            Pre-owned cards from various categories, <br /> hassle-free at best
            prices.
          </p>
          <Button divClassName="w-fit">Discover</Button>
        </div>

        <div className="flex flex-col gap-6  w-full relative after:content-['']  after:w-full after:absolute after:h-[200px] after:bg-[linear-gradient(to_bottom,#141414_0%,#14141400_100%)]  after:pointer-events-none  before:content-['']  before:w-full before:absolute before:h-[200px] before:bottom-0 before:bg-[linear-gradient(to_bottom,#14141400_0%,#141414_100%)] z-10 before:z-20  before:pointer-events-none">
          <div className="border-style-decoration bg-white/5 backdrop-blur-sm p-5  flex items-center gap-6">
            <div className="border-style-decoration bg-primary-gradient p-3.5 w-fit">
              <img src="/assets/icons/icon-handshake.svg" />{" "}
            </div>
            <span className="font-aero text-xl uppercase">
              Seamless Buying and Selling
            </span>
          </div>
          <div className="border-style-decoration bg-white/5 backdrop-blur-sm p-5  flex items-center gap-6">
            <div className="border-style-decoration bg-primary-gradient p-3.5 w-fit">
              <img src="/assets/icons/icon-user-switch.svg" />{" "}
            </div>
            <span className="font-aero text-xl uppercase">
              easy account management
            </span>
          </div>
          <div className="border-style-decoration bg-white/5 backdrop-blur-sm p-5  flex items-center gap-6">
            <div className="border-style-decoration bg-primary-gradient p-3.5 w-fit">
              <img src="/assets/icons/icon-chat-text.svg" />{" "}
            </div>
            <span className="font-aero text-xl uppercase">
              integrated chat functionality
            </span>
          </div>
          <div className="border-style-decoration bg-white/5 backdrop-blur-sm p-5  flex items-center gap-6">
            <div className="border-style-decoration bg-primary-gradient p-3.5 w-fit">
              <img src="/assets/icons/icon-credit-card.svg" />{" "}
            </div>
            <span className="font-aero text-xl uppercase">secure payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeaturesSection;
