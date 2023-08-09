import React from 'react'
import { Shimmer } from '../../core/lib'

export const HalfProductPriceOnly = ({ image, price, old_price, viewLink, currency = "$", width = 200, height = 20 }) => {
    return (
        <a style={{ width: `${width}px` }} href={viewLink} className='relative block object-contain h-full px-2 py-2 pb-5 mx-2 bg-gray-100'>
            <Shimmer src={image} className={"object-contain w-full h-4/6 object-center"} width={width} height={height} />
            <div className='px-2 py-2 my-2 font-bold rounded-lg absolute bottom-0 left-0'>
                <div className='flex justify-center  bg-rose-500 text-white px-4 rounded-md '>
                    <span className='px-2 my-2 text-sm font-bold'> <b className='font-bold'>{currency}</b> <b>{price}</b></span>
                    <span className='px-4 my-2 text-xs font-bold line-through'> {currency} {old_price}</span>
                </div>
            </div>

        </a>
    )
}