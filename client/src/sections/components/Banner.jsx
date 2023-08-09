import React, { useRef } from 'react'
import Picture from '../../core/lib/utils/Picture'
import CloseableButton from './CloseableButton';

export const Banner = ({ image, closeable = true, link = "#ADV" }) => {
    const adBannerRef = useRef();

    return (
        <a href={link} ref={adBannerRef} className='relative block w-full bg-gray-100' >
            <Picture src={image} width={window.screen.width} height={30} className={"object-contain w-full h-full object-center"} />
            {closeable && <CloseableButton closeRef={adBannerRef} />}
        </a>
    )
}
