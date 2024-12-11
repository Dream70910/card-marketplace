import React from "react"
import CardItem from "../../components/cards/CardItem"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import { homeSliderSettings } from "../../utils/data"

const MostPopularSection = ({ cards }) => {
  return (
    <div className="container px-5 mx-auto pb-24 lg:pb-48">
      <div className="flex items-end md:items-center  justify-between">
        <h2 className="uppercase font-aero text-[32px] lg:text-[42px] leading-[1.4] text-white">
          Most <br className="md:hidden" /> Popular
        </h2>

        <div className="flex items-center gap-4">
          <Link
            className="hover:bg-white w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]"
            to='/marketplace/categories'
          >
            View All
          </Link>
        </div>
      </div>

      <Slider
        {...homeSliderSettings}
        className="mt-8 dots-down"
      >
        {
          cards && cards.slice(-5).map(item =>
            <div
              key={`most-popular-${item.id}`}
              className="px-4 h-full"
            >
              <CardItem
                imageSrc={item.pictures[0]}
                title={item.title}
                price={item.price}
                description={item.description}
                sellerId={item.seller}
                cardId={item.id}
                key={`popular-card-${item.id}`}
                isRare
              />
            </div>
          )
        }
      </Slider>
    </div>
  )
}

export default MostPopularSection
