import React from 'react'
import { Link } from 'react-router-dom'

export const ALinksRounded = ({ link, content, className, onClick }) => {
    return <Link to={link} className={`px-4 py-2  ${className}`} onClick={onClick}>{content}</Link>
}
