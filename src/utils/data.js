export const brands = [
    {
        label: 'Pokemon',
        value: 'pokemon'
    },
    {
        label: 'Nintendo',
        value: 'nintendo'
    },
    {
        label: 'WIXOSS',
        value: 'wixoss'
    },
    {
        label: 'Blizzard',
        value: 'blizzard'
    }
]

export const conditions = [
    {
        label: 'Brand New',
        value: 'brand_new'
    },
    {
        label: 'Like New',
        value: 'like_new'
    },
    {
        label: 'Good',
        value: 'good'
    },
    {
        label: 'Bad',
        value: 'bad'
    }
]

export const rarities = [
    {
        label: 'Common',
        value: 'common'
    },
    {
        label: 'Rare',
        value: 'rare'
    },
    {
        label: 'Ultra Rare',
        value: 'ultra_rare'
    },
    {
        label: 'Legendary',
        value: 'legendary'
    }
]

export const homeSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
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

export const homeCategorySliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: false,
    customPaging: function (i) {
        return (
            <div className="slick-dot w-[8px] lg:w-[10px] h-[8px] lg:h-[10px] cursor-pointer bg-white/30 backdrop-blur-sm"></div>
        );
    },
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