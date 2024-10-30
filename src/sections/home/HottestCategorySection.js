import React from "react";
import CategoryCard from "../../components/cards/CardCategory";

const HottestCategorySection = () => {
  return (
    <div className="container mx-auto">
      <h2 className="uppercase font-aero text-[42px]  leading-[1.4] text-white">
        Hottest <br /> Category
      </h2>

      <div className="flex gap-4 mt-8">
        <CategoryCard
          title="Pokemon"
          description="Highly sought after by both fans and collectors, with some rare cards holding significant value."
          imageSrc="/assets/decorations/category_pokemon.png"
          iconSrc="/assets/icons/icon-arrow-up-right.svg"
          cardClassName="bg-[linear-gradient(to_top,#FEDE00_0%,#ED4024_100%)]"
        />
        <CategoryCard
          title="Football"
          description="Highly sought after by both fans and collectors, with some rare cards holding significant value."
          imageSrc="/assets/decorations/category_football.png"
          iconSrc="/assets/icons/icon-arrow-up-right.svg"
          cardClassName="bg-[linear-gradient(to_top,#292D75_0%,#009FFD_100%)]"
        />
        <CategoryCard
          title="Dragon Ball Z"
          description="Highly sought after by both fans and collectors, with some rare cards holding significant value."
          imageSrc="/assets/decorations/category_dragonball.png"
          iconSrc="/assets/icons/icon-arrow-up-right.svg"
          cardClassName="bg-[linear-gradient(to_top,#F89513_0%,#D46317_100%)]"
        />
        <CategoryCard
          title="Zelda"
          description="Highly sought after by both fans and collectors, with some rare cards holding significant value."
          imageSrc="/assets/decorations/category_zelda.png"
          iconSrc="/assets/icons/icon-arrow-up-right.svg"
          cardClassName="bg-[linear-gradient(to_top,#20A200_0%,#006C7F_100%)]"
        />
      </div>
    </div>
  );
};

export default HottestCategorySection;
