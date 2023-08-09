import React from 'react'
import Slider from "react-slick"

const MovingDisplay = ({ children = [], heading, childrenClassName = "h-4/6", className = "w-full h-full", headingStyle = 'px-4 py-2 font-sans text-xl font-bold bg-gray-600' }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        lazyLoad: true,
        rtl: true,
        cssEase: "linear"
    };

    return (
        <div className={`block  px-2 py-1 ${className}`}>
            <h4 className={headingStyle}>{heading ?? ""}</h4>
            <div style={{ height: "10vh" }}>
                <Slider {...settings}>

                    {children}
                </Slider>
            </div>
        </div>
    )
}

export default MovingDisplay