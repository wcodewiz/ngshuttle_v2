import React, { useRef } from 'react'
import { SearchFieldDoubleIcon } from './SearchFieldDoubleIcon'
import { AiOutlineSearch } from 'react-icons/ai'
import { SearchRecents } from './SearchRecents'
import { SearchDropDown } from './SearchDropDown'

export const SearchWrapper = () => {
    const searchField = useRef()

    return (
        <div className='relative px-2 py-2'>
            <SearchFieldDoubleIcon inputRef={searchField} height={6} Icon1={AiOutlineSearch} placeholder={"Search anything"} Icon2={AiOutlineSearch} iconSize={30} />
            <div className='absolute w-4/6 left-20 top-3/4'>
                <SearchRecents items={["glasses", "glasses", "glasses", "glasses", "glasses", "glasses", "glasses", "glasses",]} />
            </div>
            <SearchDropDown searchValue={searchField.current && searchField.current.value} />

        </div>
    )
}
