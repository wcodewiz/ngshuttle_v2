import React from 'react'

export const Badge = ({ count, bg_color = "bg-red-600", position = "right-1" }) => {
    return (
        <span className={`absolute top-0 px-2 py-0 text-xs font-bold ${bg_color} text-white  rounded-md ${position}`}>{count}</span>
    )
}
