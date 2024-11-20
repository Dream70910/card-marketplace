import React from "react";
import CategoryCard from "../../components/cards/CardCategory";

const HottestCategorySection = ({ categories }) => {
  return (
    categories && <div className="container mx-auto px-5 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[50%] after:translate-y-[50%] after:blur-[300px] after:bg-primary after:rounded-full after:absolute after:z-[-1]">
      <div className="flex items-end justify-between">
        <h2 className="uppercase font-aero  text-[32px]  lg:text-[42px]  leading-[1.4] text-white">
          Hottest <br /> categories
        </h2>

        <ul className="flex items-center space-x-2 mb-2">
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white"></li>
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white/30 backdrop-blur-sm"></li>
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white/30 backdrop-blur-sm"></li>
        </ul>
      </div>

      <div className="flex gap-2 lg:gap-4 mt-8 mr-[calc(-20vw-2.5rem)]  sm:mr-[calc(-20vw-640px)] md:mr-[calc(-20vw-768px)] lg:mr-[calc(-20vw-1024px)] 2xl:mr-[calc(-20vw-1536px)]">
        {
          categories.map(item =>
            <CategoryCard
              title={item.name}
              categoryId={item.id}
              description={item.description}
              imageSrc={item.image}
              iconSrc="/assets/icons/icon-arrow-up-right.svg"
              cardClassName="bg-[linear-gradient(to_top,#FEDE00_0%,#ED4024_100%)]"
              key={`category-${item.id}`}
            />
          )
        }
      </div>
    </div>
  );
};

export default HottestCategorySection;
