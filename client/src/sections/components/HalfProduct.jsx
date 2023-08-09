import React from 'react'
import { Shimmer } from '../../core/lib'
import { Badge } from './Badge'
import { Std } from '../../core/lib/shimmer/std'
import { Rating } from './Rating'

export const HalfProduct = ({ image, price, old_price, tag, rating, order_count, viewLink, currency = "$", width = 200, height = 20 }) => {
    return (
        <a style={{ width: `${width}px` }} href={viewLink} className='relative block object-contain h-full px-2 py-2 pb-5 mx-2 bg-gray-100'>
            <Shimmer src={image} className={"object-contain w-full h-4/6 object-center"} width={width} height={height} />
            <div className='px-2 py-2 my-2 font-bold'>
                <div className='flex justify-around '>
                    <span className='px-2 my-2 text-sm font-bold'> <b className='font-bold'>{currency}</b> <b>{price}</b></span>
                    <span className='px-4 my-2 text-xs font-bold line-through'> {currency} {old_price}</span>
                </div>
                <Badge count={tag} />
                <div className='flex justify-between'><span className='text-xs'>{Std.nouns(order_count, "order")}</span><Rating rate={rating} /></div>

            </div>

        </a>
    )
}