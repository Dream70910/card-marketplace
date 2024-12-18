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
        label: 'Box Damage',
        value: 'box_damage'
    },
    {
        label: 'Like New',
        value: 'like_new'
    },
    {
        label: 'Mixed',
        value: 'mixed'
    },
    {
        label: 'New',
        value: 'new'
    },
    {
        label: 'Online Returns',
        value: 'online_returns'
    },
    {
        label: 'Returns',
        value: 'returns'
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