import React, { useContext } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { AppContext } from '../../core/context/AppContext'
import { AppPops } from '../../core/enums/main';

const CloseableButton = ({ Icon = AiFillCloseCircle, iconSize = 30, closeRef }) => {
    const { app, setApp } = useContext(AppContext);
    return (<Icon fontSize={iconSize} onClick={() => {
        if (!closeRef.current.classList.contains("hidden")) {
            closeRef.current.classList.add("hidden")
            setApp({ ...app, appPops: AppPops.NONE });
        }
    }} className='absolute top-0 right-0 px-1 py-1 text-white transition-all duration-300 rounded-md cursor-pointer bg-rose-700 hover:bg-rose-500' />)
}

export default CloseableButton