import React from 'react'
import { Badge } from './Badge'
import { Rating } from './Rating';
import { Std } from "../../core/lib/shimmer/std"
import { Shimmer } from '../../core/lib';

export const FullProduct = ({ image, name, price, old_price, tag, rating, order_count, discount = 21, vendorImage = "", viewLink, vendor = "", currency = "$", width = 200, height = 20 }) => {
    return (
        <a style={{ width: `${width}px` }} href={viewLink} className='relative block object-contain h-full px-2 py-2 pb-3 mx-2 bg-gray-100'>
            <Shimmer src={image} className={"object-contain w-full h-4/6 object-center"} width={width} height={height} />
            <div className='px-2 py-2 my-2 font-bold'>
                <div className='flex justify-around '>
                    <span className='px-2 my-2 text-xl font-bold'> <b className='font-bold'>{currency}</b> <b>{price}</b></span>
                    <span className='px-4 my-2 text-xs font-bold line-through'> {currency} {old_price}</span>
                </div>
                <span className='flex justify-start w-full px-2 text-xs font-semibold text-justify'>{name}</span>
                <Badge count={tag} />
                {discount && <Badge position='left-1 top-1' count={`-${discount}%-`} />}
                <div className='flex justify-between'><span className='text-xs'>{Std.nouns(order_count, "order")}</span><Rating rate={rating} /></div>
                {(vendor && vendorImage) && <span className='flex justify-end w-full text-xs font-bold'>vendor:{vendor}</span>}
            </div>

        </a>
    )
}
