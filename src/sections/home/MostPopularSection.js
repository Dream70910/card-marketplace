import React from "react";
import CategoryCard from "../../components/cards/CardCategory";
import Button from "../../components/commons/Button";
import CardItem from "../../components/cards/CardItem";

const MostPopularSection = () => {
  return (
    <div className="container mx-auto pb-48">
      <div className="flex items-center  justify-between">
        <h2 className="uppercase font-aero text-[42px]  leading-[1.4] text-white">
          Most Popular
        </h2>

        <div className="flex items-center gap-4">
          <button className="hover:bg-white w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
            View All
          </button>
        </div>
      </div>

      <div className="flex gap-6 mt-8">
        <CardItem
          imageSrc="/assets/images/image_item_2.png"
          title="pokemon pecharunt x 2"
          price="$29.99"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.."
          buttonText="Buy Now"
        />
        <CardItem
          imageSrc="/assets/images/image_item_1.png"
          title="Cubone x 3"
          price="$180.00"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.."
          buttonText="Buy Now"
          isRare
        />
        <CardItem
          imageSrc="/assets/images/image_item_3.png"
          title="WIXOSS Wi-Cross Ele..."
          price="$12.99"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.."
          buttonText="Buy Now"
        />
        <CardItem
          imageSrc="/assets/images/image_item_4.png"
          title="world of arcraft"
          price="$120.00"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.."
          buttonText="Buy Now"
          isRare
        />
      </div>
    </div>
  );
};

export default MostPopularSection;
