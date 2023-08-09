import React from 'react'
import Picture from '../../core/lib/utils/Picture'

export const TextImage = ({ text, image = null, className = "", textStyle, link = "#item", useLink = true }) => {
    return useLink ?
        <a className={`flex items-center justify-start px-4 duration-300 hover:bg-gray-200 ${className}`} href={link}>
            {image && <Picture src={image} width={24} height={24} className={" object-contain object-center"} containerStyle='' />}
            <span className={`px-2 py-2 text-sm font-bold text-black ${textStyle}`}>{text}</span>
        </a> :
        <span className={`flex  justify-start px-4 duration-300 hover:bg-gray-200 ${className}`} href={link}>
            {image && <Picture src={image} width={24} height={24} className={"w-1/6 object-contain object-center"} containerStyle='' />}
            <span className={`px-2 py-2 text-sm font-bold text-black ${textStyle}`}>{text}</span>
        </span>

}
