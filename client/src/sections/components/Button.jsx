import React from 'react'

export const Button = ({ text, onClick, className, type = null }) => {
    let empty = () => { }
    return type ? <button type='submit' onClick={onClick ?? empty} className={`px-4 py-2 mx-2 my-2 ${className}`}>{text}</button> :
        <button onClick={onClick ?? empty} className={`px-4 py-2 mx-2 my-2 ${className}`}>{text}</button>
}
