import React from "react"
import CardItem from "../../components/cards/CardItem"
import { Link } from "react-router-dom"
import Slider from "react-slick"

const MostPopularSection = ({ cards }) => {
  const homeMostSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    prevArrow:
      <div>
        <button className="flex justify-center items-center pl-2 pr-3 py-2 bg-[#1AB6F9] border-[1px]">
          <svg width="15" height="20" viewBox="0 0 17 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.541672 16.5417L17 33L17 0.0833397L0.541672 16.5417Z" fill="white" />
          </svg>
        </button>
      </div>,
    nextArrow:
      <div>
        <button className="flex justify-center items-center pl-3 pr-2 py-2 bg-[#1AB6F9] border-[1px]">
          <svg width="18" height="20" viewBox="0 0 17 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4583 16.4583L0 0L-1.43883e-06 32.9167L16.4583 16.4583Z" fill="white" />
          </svg>
        </button>
      </div>,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <div className="slick-dot w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white/30 backdrop-blur-sm"></div>
      );
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

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
        {...homeMostSliderSettings}
        className="mt-8 dots-down custom-arrows arrows-down"
      >
        {
          cards && cards.slice(-5).map(item =>
            <div
              key={`most-popular-${item.id}`}
              className="h-full"
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
