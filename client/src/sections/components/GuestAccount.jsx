import React from 'react'
import { Navigation } from './Navigation'
import { NavigationAxis } from '../../core/enums/main'
import { AiOutlineUser } from 'react-icons/ai'

export const GuestAccount = ({ children = [], heading = "User Profile" }) => {
    return (<Navigation showLable={false} axis={NavigationAxis.Vertical}>
        {heading && <h4 className='px-4 py-2 text-xl font-bold text-gray-800 capitalize'>{heading}</h4>}
        <div className='flex items-center justify-center w-full py-4'>
            <AiOutlineUser fontSize={100} className='px-2 py-2 border border-gray-400 rounded-full' />
        </div>
        {children}
    </Navigation>)
}
