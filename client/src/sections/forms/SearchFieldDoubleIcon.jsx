import React, { useRef } from 'react'
import { Input } from './Input'



export const SearchFieldDoubleIcon = ({ placeholder, Icon1, Icon2, iconSize = 30, height = 11, inputRef = null }) => {
    const icon = useRef();
    const input = inputRef;

    let edited = (ev) => {
        let icon1 = icon.current.firstChild;
        let classes = icon1.classList;
        if (`${ev.target.value}`.length > 0) {
            if (classes.contains("hidden")) {
                icon1.classList.remove("hidden")
            }
        } else {
            if (!classes.contains("hidden")) {
                icon1.classList.add("hidden")
            }
        }
    }

    return (
        <div style={{ height: `${height}vh` }} className='flex items-center justify-between border-2 rounded-full bg-gray-50'>
            <div ref={icon} className='px-4' >
                <Icon1 className="hidden" fontSize={iconSize / 1.5} />
            </div>
            <Input className="w-full py-3 placeholder:font-bold placeholder:text-xl placeholder:text-gray-600" ref={input} change={edited} placeholder={placeholder} name={"searchbox"} />
            <div className='flex items-center justify-center w-1/6 h-full bg-gray-200 rounded-full rounded-l-none cursor-pointer'>
                <Icon2 fontSize={iconSize} />
            </div>


        </div>
    )
}
