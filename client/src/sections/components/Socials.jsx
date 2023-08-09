import React, { useRef } from 'react'
import CloseableButton from './CloseableButton'

export const Socials = ({ children = [] }) => {
    const socl = useRef();
    return (
        <div ref={socl} className='fixed left-0 h-auto px-0 py-8 bg-gray-100 rounded-md bottom-2/4' style={{ width: '60px' }}>
            {children.map((e, i) => <e.icon fontSize={40} className={`my-2 ${e.color ?? ""}`} key={i} />)}
            <CloseableButton closeRef={socl} />
        </div>
    )
}
