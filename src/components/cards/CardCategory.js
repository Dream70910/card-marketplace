import React from "react";

const CategoryCard = ({
  title = "Category",
  description = "Description goes here.",
  imageSrc,
  iconSrc,
  cardClassName = "",
  buttonClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}) => (
  <div
    className={`w-full max-w-[380px] flex flex-col justify-between card-category relative group ${cardClassName}`}
  >
    <button
      className={`absolute top-0 right-0 bg-white p-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition ${buttonClassName}`}
    >
      <img
        src={iconSrc || "/assets/icons/icon-arrow-up-right.svg"}
        alt="icon"
      />
    </button>
    <div className="p-6 mb-5">
      <h4
        className={`font-aero uppercase text-[32px] text-white ${titleClassName}`}
      >
        {title}
      </h4>
      <p className={`text-base text-white ${descriptionClassName}`}>
        {description}
      </p>
    </div>
    <img
      src={imageSrc || "/assets/decorations/category_default.png"}
      alt={title}
      className="max-h-[335px] object-cover w-full"
    />
  </div>
);

export default CategoryCard;
