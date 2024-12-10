import React from "react"
import CategoryCard from "../../components/cards/CardCategory"
import Slider from "react-slick"

const HottestCategorySection = ({ categories }) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
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

      <Slider
        className="mt-8 flex items-stretch"
        {...sliderSettings}
      >
        {
          categories.map(item =>
            <div
              key={`category-${item.id}`}
              className="px-4 h-full"
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
    </div>
  )
}

export default HottestCategorySection
