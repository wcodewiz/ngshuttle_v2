import React from 'react'
import { Link } from 'react-router-dom'

export const TextIcon = ({ text, Icon = null, iconSize = 20, className = "", textStyle, link = "#item", useLink = true }) => {
    return useLink ?
        <Link className={`flex items-center justify-start px-4 duration-300 hover:bg-gray-200 ${className}`} href={link}>
            {Icon && <Icon fontSize={iconSize} />}
            <span className={`px-2 py-2 text-sm font-bold text-black ${textStyle}`}>{text}</span>
        </Link> :
        <span className={`flex items-center justify-start px-4 duration-300 hover:bg-gray-200 ${className}`} href={link}>
            {Icon && <Icon fontSize={iconSize} />}
            <span className={`px-2 py-2 text-sm font-bold text-black ${textStyle}`}>{text}</span>
        </span>

}
