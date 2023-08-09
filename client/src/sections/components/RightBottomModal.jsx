import React, { useRef } from 'react'
import CloseableButton from './CloseableButton';

const RightBottomModal = ({ show, children = [], width = 30, height = 20, closeable = true, className = "" }) => {
    const content = useRef();

    return show && <div ref={content} style={{ width: `${width}%`, height: `${height}%` }} className={`px-4 bg-white rounded-md  ${className} fixed bottom-5 shadow-md shadow-black z-10 right-0`}>
        {children}
        {closeable && <CloseableButton closeRef={content} iconSize={30} />}
    </div>

}

export default RightBottomModal