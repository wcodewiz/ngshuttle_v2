import React from 'react'
import Marquee from 'react-fast-marquee'

export const SearchRecents = ({ items, className }) => {
    return (
        <Marquee className={`flex justify-around ${className}`} delay={5} speed={20}>
            {items.map((e, i) => <span className='px-1 mx-2 text-xs font-bold text-gray-500 bg-gray-200 rounded-md' key={i}>{e}</span>)}
        </Marquee>
    )
}
