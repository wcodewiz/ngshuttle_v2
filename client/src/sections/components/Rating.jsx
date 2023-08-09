import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export const Rating = ({ rate, color = "text-rose-600", iconSize = 10 }) => {
    let childrens = [];
    if (childrens.length <= rate) {
        for (let index = 0; index < rate; index++) {
            let item = <AiFillStar key={index} fontSize={iconSize} className={`${color}`} />
            childrens.push(item);
        }
    }
    for (let index = childrens.length - 1; index < 4; index++) {
        let item = <AiOutlineStar key={childrens.length + index} fontSize={iconSize} className={`${color}`} />
        childrens.push(item);
    }
    return childrens.length > 0 && <span className='flex items-center justify-start flex-nowrap'>{childrens} <small className='text-xs font-semibold'>{rate}.0</small></span>;
}
