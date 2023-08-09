import React from 'react'
import { Navigation } from '../components/Navigation'
import { NavigationAxis } from '../../core/enums/main'
import { AiOutlineSearch } from 'react-icons/ai'
import { TextIcon } from '../components/TextIcon'

export const SearchDropDown = ({ searchValue }) => {
    return (
        <div id="drops" className='absolute z-10 hidden w-full bg-gray-200 rounded-md shadow-md top-5/6 shadow-gray-700 hv-60'>
            <Navigation showLable={true} axis={NavigationAxis.Vertical}>
                <h4 className='px-4 py-2 mx-4 font-bold text-black'>Search Suggestion</h4>
                {["search mak", "search mak", "search mak", "search mak", "search mak", "search mak"]
                    .map((e, i) => <TextIcon Icon={AiOutlineSearch} iconSize={20} text={e} key={i} />)}
            </Navigation>
        </div>

    )
}
