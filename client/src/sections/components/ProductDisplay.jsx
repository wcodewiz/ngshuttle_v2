import React from 'react'
import { List } from './List'

const ProductDisplay = ({ children = [], heading, headingStyle = 'px-4 py-2 font-sans text-xl font-bold bg-gray-600' }) => {
    return (
        <div className='block w-full h-full px-2 py-1'>
            <h4 className={headingStyle}>{heading ?? ""}</h4>

            <List className='h-5/6'>
                {children}
            </List>
        </div>
    )
}

export default ProductDisplay