import React from 'react'
import { ModalDialog } from './ModalDialog'

export const ShowProductAdv = ({ image, children }) => {
    return <ModalDialog closeable={true} show={true}>
        <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} className='flex items-end justify-center w-full h-full'>
            {children}
        </div>
    </ModalDialog>
}
