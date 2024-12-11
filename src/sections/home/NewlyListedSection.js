import React from "react"
import CardItem from "../../components/cards/CardItem"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import { homeSliderSettings } from "../../utils/data"

const NewlyListedSection = ({ categories, cards }) => {
  return (
    <div className="container px-5 mx-auto pb-24 lg:pb-48">
      <div className="flex flex-col lg:flex-row lg:items-center  justify-between">
        <h2 className="uppercase font-aero text-[32px] lg:text-[42px]  leading-[1.4] text-white">
          Newly Listed
        </h2>

        <div className="flex items-center gap-2 mt-5 lg:mt-0 lg:gap-4">
          {
            categories && categories.map(item =>
              <Link
                className="hover:bg-white w-full lg:w-fit hover:text-[#141414] justify-center text-[11px] lg:text-base flex items-center p-3 px-4 lg:p-4 lg:px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]"
                key={`home-category-2-${item.id}`}
                to={`/marketplace/categories?categories=${item.id}`}
              >
                {item.name}
              </Link>
            )
          }
        </div>
      </div>

      <Slider
        {...homeSliderSettings}
        className="mt-8 dots-down"
      >
        {
          cards && cards.slice(0, 5).map(item =>
            <div
              key={`new-listed-${item.id}`}
              className="px-4 h-full"
            >
              <CardItem
                imageSrc={item.pictures[0]}
                title={item.title}
                price={item.price}
                description={item.description}
                sellerId={item.seller}
                cardId={item.id}
                key={`new-card-${item.id}`}
                isRare
              />
            </div>
          )
        }
      </Slider>

      {/* <div className="w-fit mx-auto mt-12 lg:mt-16">
        <ul className="flex items-center space-x-2">
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white"></li>
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white/30 backdrop-blur-sm"></li>
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white/30 backdrop-blur-sm"></li>
        </ul>
      </div> */}
    </div>
  )
}

export default NewlyListedSection
