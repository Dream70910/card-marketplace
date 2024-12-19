import React from "react"
import CategoryCard from "../../components/cards/CardCategory"
import Slider from "react-slick"

const HottestCategorySection = ({ categories }) => {
  const homeCategorySliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    prevArrow:
      <div>
        <button className="flex justify-center items-center pl-4 pr-5 py-3 bg-[#1AB6F9] border-[1px]">
          <svg width="15" height="25" viewBox="0 0 17 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.541672 16.5417L17 33L17 0.0833397L0.541672 16.5417Z" fill="white" />
          </svg>
        </button>
      </div>,
    nextArrow:
      <div>
        <button className="flex justify-center items-center pl-5 pr-4 py-3 bg-[#1AB6F9] border-[1px]">
          <svg width="18" height="25" viewBox="0 0 17 33" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        breakpoint: 1024,
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
    categories && <div className="container mx-auto px-5 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[50%] after:translate-y-[50%] after:blur-[300px] after:bg-primary after:rounded-full after:absolute after:z-[-1]">
      <div className="flex items-end justify-between">
        <h2 className="uppercase font-aero  text-[32px]  lg:text-[42px]  leading-[1.4] text-white">
          Hottest <br /> categories
        </h2>

        {/* <ul className="flex items-center space-x-2 mb-2">
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white"></li>
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white/30 backdrop-blur-sm"></li>
          <li className="w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white/30 backdrop-blur-sm"></li>
        </ul> */}
      </div>

      <div className="relative">
        <Slider
          className="mt-8 flex items-stretch dots-top custom-arrows arrows-center"
          {...homeCategorySliderSettings}
        >
          {
            categories.map(item =>
              <div
                key={`category-${item.id} `}
                className="h-full"
              >
                <CategoryCard
                  title={item.name}
                  categoryId={item.id}
                  description={item.description}
                  imageSrc={item.image}
                  iconSrc="/assets/icons/icon-arrow-up-right.svg"
                  cardClassName="bg-[linear-gradient(to_top,#FEDE00_0%,#ED4024_100%)]"
                />
              </div>
            )
          }
        </Slider>

        {/* <div className="flex absolute top-[50%] -translate-y-1/2 left-4 ml-[1px] w-full">

          <button className="flex justify-center items-center pl-5 pr-4 py-3 bg-[#1AB6F9] border-[1px] ml-auto mr-4 translate-x-[-1px]">
            <svg width="18" height="25" viewBox="0 0 17 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.4583 16.4583L0 0L-1.43883e-06 32.9167L16.4583 16.4583Z" fill="white" />
            </svg>
          </button>
        </div> */}
      </div>
    </div >
  )
}

export default HottestCategorySection
