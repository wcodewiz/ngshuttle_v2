import React from 'react'
import Picture from '../../core/lib/utils/Picture'

const ListTile = ({ leadingSrc, leadingStyle, title, subtile, Trailing, maxTitleLine = 20 }) => {
    return (
        <div className='flex justify-between w-full px-2 py-2 my-2 bg-gray-200'>
            <div className='w-1/6'>
                <Picture src={leadingSrc} className={leadingStyle + " object-cover rounded-full"} width={40} height={40} />
            </div>
            <div className='flex flex-col items-start w-4/6 px-2 my-2'>
                <span title={title} className='text-sm font-bold text-black whitespace-nowrap'>
                    {title.length > maxTitleLine ? title.substring(0, maxTitleLine - 1) + "..." : title}
                </span>
                <span className='px-2 mx-4 text-xs font-bold text-gray-800'>
                    {subtile}
                </span>

            </div>
            <div className='flex items-center justify-center'>
                <Trailing />
            </div>

        </div>
    )
}

export default ListTile