import React from 'react'
import { Shimmer } from '../../core/lib'
import { ShimmerEffectTypes } from '../../core/lib/shimmer/std'

export const SimpleList = ({ text, image = null, className = "", textStyle, link = "#item", useLink = true, imageWidth = 16, hover }) => {
    return useLink ?
        <a className={`flex items-center whitespace-nowrap hover:font-extrabold justify-start px-4 duration-300 hover:bg-gray-200 my-2 ${className}`} href={link} onMouseOver={hover}>
            {image && <Shimmer src={image} className={"object-contain object-center w-1/6 h-1/6 "} imageWidth={imageWidth} alt={"item"} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />}
            <span className={`px-2 py-2 text-sm font-bold text-black ${textStyle} hover:font-extrabold`}>{text}</span>
        </a> :
        <span className={`flex  justify-start px-4 duration-300 hover:font-extrabold hover:bg-gray-200 my-2 ${className}`} href={link} onMouseOver={hover}>
            {image && <Shimmer src={image} className={`object-contain object-center ${className}`} imageWidth={imageWidth} alt={"item"} shimmerEffectTypes={ShimmerEffectTypes.SHIMMER} />}
            <span className={`px-2 py-2 text-sm font-bold text-black hover:font-extrabold ${textStyle}`}>{text}</span>
        </span>

}
