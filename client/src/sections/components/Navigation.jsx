import React from 'react'
import { NavigationAxis } from '../../core/enums/main'

export const Navigation = ({ axis, children, position = "relative", showLable = true, className = "" }) => {
    return (axis === NavigationAxis.Horizontal ? <div className={`flex justify-around px-2 ml-4 ${position}`}>
        {children}
    </div> :
        <div className={`flex flex-col justify-start  px-0 mx-0 h-full ${position} ${className} bg-gray-100`}>
            <div className={`flex flex-col justify-start  px-0 mx-0 h-full ${position} `}>
                {children}
            </div>
            {showLable && <span className='absolute right-0 text-xs top-full'>{window.powered}</span>}
        </div >
    )
}
