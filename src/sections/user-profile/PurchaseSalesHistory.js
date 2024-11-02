import React, { useState } from "react";
import CardPurchaseHistory from "../../components/cards/CardPurchaseHistory";
import Button from "../../components/commons/Button";
import Dropdown from "../../components/commons/Dropdown";
import TextInput from "../../components/commons/TextInput";

const PurchaseSalesHistory = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("purchase");

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className="w-full flex">
        <li
          className={`text-white text-center w-full pb-4 border-b-2 cursor-pointer ${
            activeTab === "purchase" ? "border-b-primary" : "border-b-white/20"
          }`}
          onClick={() => handleTabClick("purchase")}
        >
          Purchase History
        </li>
        <li
          className={`text-white text-center w-full pb-4 border-b-2 cursor-pointer ${
            activeTab === "sale" ? "border-b-primary" : "border-b-white/20"
          }`}
          onClick={() => handleTabClick("sale")}
        >
          Sale History
        </li>
      </ul>

      {/* Render the appropriate component based on the active tab */}
      {activeTab === "purchase" ? <PurchaseHistory /> : <SaleHistory />}
    </div>
  );
};

export default PurchaseSalesHistory;

const SaleHistory = () => {
  const options = [
    { value: "", label: "Filter By" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const options2 = [
    { value: "", label: "Sort By" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const options3 = [
    { value: "", label: "Date" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleDropdownChange = (event) => {
    console.log(event.target.value);
  };
  const handleDropdownChange2 = (event) => {
    console.log(event.target.value);
  };
  const handleDropdownChange3 = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="w-full  mt-12">
      <div className="flex items-end gap-12 justify-between w-full">
        <div className="flex items-center w-full gap-6">
          <Dropdown
            options={options}
            placeholder="Filter by"
            onChange={handleDropdownChange}
            className="w-full lg:max-w-[285px]"
          />
          <TextInput placeholder="Search for cards" />
          <Dropdown
            options={options2}
            placeholder="Sort by"
            onChange={handleDropdownChange2}
            className="w-full lg:max-w-[150px]"
          />
          <Dropdown
            options={options3}
            placeholder="Date by"
            onChange={handleDropdownChange3}
            className="w-full lg:max-w-[150px]"
          />
        </div>
        <span className="whitespace-nowrap text-white">
          Showing 18 of 18 orders
        </span>
      </div>{" "}
      <table
        className="border-separate w-full  mt-8"
        style={{ borderSpacing: "0 20px" }}
      >
        <thead className="text-white !font-normal border-b border-b-white/20">
          <th
            align="left"
            className="bg-transparent !font-normal border-b border-b-white/20 pb-5"
          ></th>
          <th
            align="left"
            className="bg-transparent !font-normal border-b border-b-white/20 pb-5"
          >
            Product
          </th>
          <th
            align="left"
            className="bg-transparent !font-normal border-b border-b-white/20 pb-5 px-4"
          >
            Product Detail
          </th>
          <th
            align="left"
            className="bg-transparent !font-normal border-b border-b-white/20 pb-5 px-4"
          >
            Cost
          </th>
          <th
            align="left"
            className="bg-transparent !font-normal border-b border-b-white/20 pb-5 px-4"
          >
            Status & Delivery
          </th>

          <th
            align="left"
            className="bg-transparent !font-normal border-b border-b-white/20 pb-5 px-4"
          >
            Action
          </th>
        </thead>
        <tbody>
          <tr className="bg-white/5 backdrop-blur-sm text-base border-style-decoration">
            <td className="p-3 w-[250px] border-l border-l-white/20 border-y border-y-white/20">
              <img
                src="/assets/images/image_item_2.png"
                className="border-style-decoration"
              />
            </td>
            <td className="py-3 px-4 w-fit border-y border-y-white/20">
              <div className="space-y-3">
                <div className="flex items-center">
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                </div>
                <h4 className="w-full max-w-[240px] lg:max-w-[300px] font-aero text-sm lg:text-xl text-white leading-[1.1] uppercase">
                  pokemon pecharunt x 2
                </h4>

                <p className="text-xs  text-white/60 mt-4 lg:mt-0 max-w-[200px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod..
                </p>

                <div className="flex items-center space-x-2 ">
                  <img
                    src="/assets/avatars/avatar.png"
                    className="max-w-[32px] lg:max-w-[32px] border-style-decoration object-cover"
                    alt="User Avatar"
                  />
                  <div className="flex items-center">
                    <span className="text-sm text-white whitespace-nowrap">
                      Emily Johnson
                    </span>
                    <span className="text-sm text-white whitespace-nowrap">
                      <img
                        src="/assets/icons/icon-chat.svg"
                        className="max-w-[14px] lg:max-w-[unset] ml-1 lg:ml-2 mt-1"
                      />{" "}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 border-y border-y-white/20">
              <span className="gradient-text font-aero text-base lg:text-2xl ">
                $29.99
              </span>
            </td>
            <td className="h-full px-4 border-y border-y-white/20">
              <div className="flex flex-col gap-20 justify-between h-full">
                <span className="hidden lg:block rounded-full px-4 py-2 text-xs lg:text-sm text-primary bg-primary/20 border border-primary w-fit">
                  Being Processed
                </span>

                <div className="flex items-start lg:flex-col gap-1 mt-auto">
                  <span className="text-xs lg:text-sm text-primary block whitespace-nowrap">
                    Expected Delivery
                  </span>
                  <span className="text-xs lg:text-sm text-white block whitespace-nowrap">
                    17 Oct, 2024
                  </span>
                </div>
              </div>
            </td>

            <td className="px-4 pr-8 border-y border-y-white/20 border-r border-r-white/20">
              <button className="hover:bg-primary relative w-full hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap">
                View order summary
              </button>
              <Button isActive divClassName="!mt-3 lg:!mt-5">
                Buy Now
              </Button>
            </td>
          </tr>
          <tr className="bg-white/5 backdrop-blur-sm text-base border-style-decoration">
            <td className="p-3 w-[250px] border-l border-l-white/20 border-y border-y-white/20">
              <img
                src="/assets/images/image_item_1.png"
                className="border-style-decoration"
              />
            </td>
            <td className="py-3 px-4 w-fit border-y border-y-white/20">
              <div className="space-y-3">
                <div className="flex items-center">
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                </div>
                <h4 className="w-full max-w-[240px] lg:max-w-[300px] font-aero text-sm lg:text-xl text-white leading-[1.1] uppercase">
                  cubone x 3
                </h4>

                <p className="text-xs  text-white/60 mt-4 lg:mt-0 max-w-[200px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod..
                </p>

                <div className="flex items-center space-x-2 ">
                  <img
                    src="/assets/avatars/avatar.png"
                    className="max-w-[32px] lg:max-w-[32px] border-style-decoration object-cover"
                    alt="User Avatar"
                  />
                  <div className="flex items-center">
                    <span className="text-sm text-white whitespace-nowrap">
                      Emily Johnson
                    </span>
                    <span className="text-sm text-white whitespace-nowrap">
                      <img
                        src="/assets/icons/icon-chat.svg"
                        className="max-w-[14px] lg:max-w-[unset] ml-1 lg:ml-2 mt-1"
                      />{" "}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 border-y border-y-white/20">
              <span className="gradient-text font-aero text-base lg:text-2xl ">
                $120.00
              </span>
            </td>
            <td className="h-full px-4 border-y border-y-white/20">
              <div className="flex flex-col gap-20 justify-between h-full">
                <span className="hidden lg:block rounded-full px-4 py-2 text-xs lg:text-sm text-primary bg-primary/20 border border-primary w-fit">
                  Being Processed
                </span>

                <div className="flex items-start lg:flex-col gap-1 mt-auto">
                  <span className="text-xs lg:text-sm text-primary block whitespace-nowrap">
                    Expected Delivery
                  </span>
                  <span className="text-xs lg:text-sm text-white block whitespace-nowrap">
                    17 Oct, 2024
                  </span>
                </div>
              </div>
            </td>

            <td className="px-4 pr-8 border-y border-y-white/20 border-r border-r-white/20">
              <button className="hover:bg-primary relative w-full hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap">
                View order summary
              </button>
              <Button isActive divClassName="!mt-3 lg:!mt-5">
                Buy Now
              </Button>
            </td>
          </tr>
          <tr className="bg-white/5 backdrop-blur-sm text-base border-style-decoration">
            <td className="p-3 w-[250px] border-l border-l-white/20 border-y border-y-white/20">
              <img
                src="/assets/images/image_item_7.png"
                className="border-style-decoration"
              />
            </td>
            <td className="py-3 px-4 w-fit border-y border-y-white/20">
              <div className="space-y-3">
                <div className="flex items-center">
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                </div>
                <h4 className="w-full max-w-[240px] lg:max-w-[300px] font-aero text-sm lg:text-xl text-white leading-[1.1] uppercase">
                  WIXOSS Wi-Cross Ele...
                </h4>

                <p className="text-xs  text-white/60 mt-4 lg:mt-0 max-w-[200px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod..
                </p>

                <div className="flex items-center space-x-2 ">
                  <img
                    src="/assets/avatars/avatar.png"
                    className="max-w-[32px] lg:max-w-[32px] border-style-decoration object-cover"
                    alt="User Avatar"
                  />
                  <div className="flex items-center">
                    <span className="text-sm text-white whitespace-nowrap">
                      Emily Johnson
                    </span>
                    <span className="text-sm text-white whitespace-nowrap">
                      <img
                        src="/assets/icons/icon-chat.svg"
                        className="max-w-[14px] lg:max-w-[unset] ml-1 lg:ml-2 mt-1"
                      />{" "}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 border-y border-y-white/20">
              <span className="gradient-text font-aero text-base lg:text-2xl ">
                $12.99
              </span>
            </td>
            <td className="h-full px-4 border-y border-y-white/20">
              <div className="flex flex-col gap-20 justify-between h-full">
                <span className="hidden lg:block rounded-full px-4 py-2 text-xs lg:text-sm text-white bg-white/20 border border-white w-fit">
                  Recently Viewed
                </span>

                <div className="flex items-start lg:flex-col gap-1 mt-auto">
                  <span className="text-xs lg:text-sm text-primary block whitespace-nowrap">
                    Delivery in 4-5 days
                  </span>
                  <span className="text-xs lg:text-sm text-white block whitespace-nowrap">
                    Order in next 240hrs
                  </span>
                </div>
              </div>
            </td>

            <td className="px-4 pr-8 border-y border-y-white/20 border-r border-r-white/20">
              <button className="hover:bg-primary relative w-full hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap">
                View order summary
              </button>
              <Button isActive divClassName="!mt-3 lg:!mt-5">
                Buy Now
              </Button>
            </td>
          </tr>
          <tr className="bg-white/5 backdrop-blur-sm text-base border-style-decoration">
            <td className="p-3 w-[250px] border-l border-l-white/20 border-y border-y-white/20">
              <img
                src="/assets/images/image_item_3.png"
                className="border-style-decoration"
              />
            </td>
            <td className="py-3 px-4 w-fit border-y border-y-white/20">
              <div className="space-y-3">
                <div className="flex items-center">
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                </div>
                <h4 className="w-full max-w-[240px] lg:max-w-[300px] font-aero text-sm lg:text-xl text-white leading-[1.1] uppercase">
                  WIXOSS Wi-Cross Ele...
                </h4>

                <p className="text-xs  text-white/60 mt-4 lg:mt-0 max-w-[200px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod..
                </p>

                <div className="flex items-center space-x-2 ">
                  <img
                    src="/assets/avatars/avatar.png"
                    className="max-w-[32px] lg:max-w-[32px] border-style-decoration object-cover"
                    alt="User Avatar"
                  />
                  <div className="flex items-center">
                    <span className="text-sm text-white whitespace-nowrap">
                      Emily Johnson
                    </span>
                    <span className="text-sm text-white whitespace-nowrap">
                      <img
                        src="/assets/icons/icon-chat.svg"
                        className="max-w-[14px] lg:max-w-[unset] ml-1 lg:ml-2 mt-1"
                      />{" "}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 border-y border-y-white/20">
              <span className="gradient-text font-aero text-base lg:text-2xl ">
                $12.99
              </span>
            </td>
            <td className="h-full px-4 border-y border-y-white/20">
              <div className="flex flex-col gap-20 justify-between h-full">
                <span className="hidden lg:block rounded-full px-4 py-2 text-xs lg:text-sm text-primary bg-primary/20 border border-primary w-fit">
                  Being Processed
                </span>

                <div className="flex items-start lg:flex-col gap-1 mt-auto">
                  <span className="text-xs lg:text-sm text-primary block whitespace-nowrap">
                    Expected Delivery
                  </span>
                  <span className="text-xs lg:text-sm text-white block whitespace-nowrap">
                    17 Oct, 2024
                  </span>
                </div>
              </div>
            </td>

            <td className="px-4 pr-8 border-y border-y-white/20 border-r border-r-white/20">
              <button className="hover:bg-primary relative w-full hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap">
                View order summary
              </button>
              <Button isActive divClassName="!mt-3 lg:!mt-5">
                Buy Now
              </Button>
            </td>
          </tr>
          <tr className="bg-white/5 backdrop-blur-sm text-base border-style-decoration">
            <td className="p-3 w-[250px] border-l border-l-white/20 border-y border-y-white/20">
              <img
                src="/assets/images/image_item_8.png"
                className="border-style-decoration"
              />
            </td>
            <td className="py-3 px-4 w-fit border-y border-y-white/20">
              <div className="space-y-3">
                <div className="flex items-center">
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                  <img
                    src="/assets/icons/icon-star-fill.svg"
                    className="w-[14px] lg:w-[24px]"
                  />
                </div>
                <h4 className="w-full max-w-[240px] lg:max-w-[300px] font-aero text-sm lg:text-xl text-white leading-[1.1] uppercase">
                  world of arcraft
                </h4>

                <p className="text-xs  text-white/60 mt-4 lg:mt-0 max-w-[200px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod..
                </p>

                <div className="flex items-center space-x-2 ">
                  <img
                    src="/assets/avatars/avatar.png"
                    className="max-w-[32px] lg:max-w-[32px] border-style-decoration object-cover"
                    alt="User Avatar"
                  />
                  <div className="flex items-center">
                    <span className="text-sm text-white whitespace-nowrap">
                      Emily Johnson
                    </span>
                    <span className="text-sm text-white whitespace-nowrap">
                      <img
                        src="/assets/icons/icon-chat.svg"
                        className="max-w-[14px] lg:max-w-[unset] ml-1 lg:ml-2 mt-1"
                      />{" "}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 border-y border-y-white/20">
              <span className="gradient-text font-aero text-base lg:text-2xl ">
                $120.00
              </span>
            </td>
            <td className="h-full px-4 border-y border-y-white/20">
              <div className="flex flex-col gap-20 justify-between h-full">
                <span className="hidden lg:block rounded-full px-4 py-2 text-xs lg:text-sm text-white bg-white/20 border border-white w-fit">
                  Recently Viewed
                </span>

                <div className="flex items-start lg:flex-col gap-1 mt-auto">
                  <span className="text-xs lg:text-sm text-primary block whitespace-nowrap">
                    Delivery in 4-5 days
                  </span>
                  <span className="text-xs lg:text-sm text-white block whitespace-nowrap">
                    Order in next 240hrs
                  </span>
                </div>
              </div>
            </td>

            <td className="px-4 pr-8 border-y border-y-white/20 border-r border-r-white/20">
              <button className="hover:bg-primary relative w-full hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap">
                View order summary
              </button>
              <Button isActive divClassName="!mt-3 lg:!mt-5">
                Buy Now
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
        <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
          Load More
        </button>
      </div>
    </div>
  );
};

const PurchaseHistory = () => {
  return (
    <div className="mt-12 space-y-6">
      <CardPurchaseHistory
        imageSrc="/assets/images/image_item_2.png"
        title="pokemon pecharunt x 2"
        status="Delivered"
        date="17 Sept, 2023"
        avatarSrc="/assets/avatars/avatar.png"
        userName="Emily Johnson"
        price="$29.99"
        onContactSeller={() => {}}
        onReview={() => {}}
      />
      <CardPurchaseHistory
        imageSrc="/assets/images/image_item_1.png"
        title="cubone x 3"
        status="Delivered"
        date="17 Sept, 2023"
        avatarSrc="/assets/avatars/avatar.png"
        userName="Emily Johnson"
        price="$120.00"
        onContactSeller={() => {}}
        onReview={() => {}}
      />
      <CardPurchaseHistory
        imageSrc="/assets/images/image_item_7.png"
        title="WIXOSS Wi-Cross Ele..."
        status="Delivered"
        date="17 Sept, 2023"
        avatarSrc="/assets/avatars/avatar.png"
        userName="Emily Johnson"
        price="$12.99"
        onContactSeller={() => {}}
        onReview={() => {}}
      />
      <CardPurchaseHistory
        imageSrc="/assets/images/image_item_3.png"
        title="WIXOSS Wi-Cross Ele..."
        status="Delivered"
        date="17 Sept, 2023"
        avatarSrc="/assets/avatars/avatar.png"
        userName="Emily Johnson"
        price="$12.99"
        onContactSeller={() => {}}
        onReview={() => {}}
      />
      <CardPurchaseHistory
        imageSrc="/assets/images/image_item_8.png"
        title="world of arcraft"
        status="Delivered"
        date="17 Sept, 2023"
        avatarSrc="/assets/avatars/avatar.png"
        userName="Emily Johnson"
        price="$120.00"
        onContactSeller={() => {}}
        onReview={() => {}}
      />

      <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
        <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
          Load More
        </button>
      </div>
    </div>
  );
};
