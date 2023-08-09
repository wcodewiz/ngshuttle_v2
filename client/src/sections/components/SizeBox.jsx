import React from 'react'

export const SizeBox = ({ height = 0, width = 0 }) => {
    return (
        <div style={{ height: `${height}vh`, width: `${width}vh` }}></div >
    )
}
