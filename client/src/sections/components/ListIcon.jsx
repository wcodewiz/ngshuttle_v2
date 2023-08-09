import React from 'react'
import Picture from '../../core/lib/utils/Picture'

const ListIcon = ({ leadingSrc, leadingStyle, children = [], className = "" }) => {
    return (
        <div className={`flex items-center justify-start w-full px-2 py-2 my-2 bg-gray-200 ${className}`}>
            <div className='w-1/6'>
                <Picture src={leadingSrc} className={leadingStyle + " object-cover rounded-full"} width={40} height={40} />
            </div>
            <div className='flex flex-col items-start w-4/6 px-2 my-2'>
                {children}
            </div>


        </div>
    )
}

export default ListIcon