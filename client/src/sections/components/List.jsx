import React from 'react'
import { NavigationAxis } from '../../core/enums/main'

export const List = ({ children = [], className = "h-full", axis = NavigationAxis.Horizontal, }) => {
    return (axis === NavigationAxis.Horizontal ? <div className={`flex justify-around px-2 ml-4 w-full ${className}`}>
        {children}
    </div> :
        <div className={`flex flex-col justify-start  px-0 mx-0 h-full  ${className} `}>
            <div className={`flex flex-col justify-start  px-0 mx-0 h-full`}>
                {children}
            </div>
        </div >
    )
}
