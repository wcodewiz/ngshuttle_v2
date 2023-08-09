import React, { useRef } from 'react'
import CloseableButton from './CloseableButton'

export const ModalDialog = ({ show, children = [], closeable = true, className = "" }) => {
    const content = useRef();

    return show && <div ref={content} className='fixed top-0 left-0 z-30 w-full h-screen px-4'>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-75'></div>
        <div className='relative flex items-center justify-center w-full h-full'>
            <div className={`w-3/6 px-4 bg-white rounded-md block h-5/6 ${className} relative`}>
                {children}
                {closeable && <CloseableButton closeRef={content} iconSize={30} />}
            </div>
        </div>
    </div>

}
