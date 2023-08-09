import { useState, useEffect } from 'react'
import { SizeBox } from './SizeBox'
import { Navigation } from './Navigation'
import { NavigationAxis, RequestMethod } from '../../core/enums/main'
import { TextIcon } from './TextIcon'
import { MdCategory } from 'react-icons/md'
import useApi from '../../useApi'
import { DropMenu } from './DropMenu'

export const LeftSideBar = () => {

    const [start, setStart] = useState(false);
    const [categories, setCatories] = useState(null);


    useApi(start, "category/get", RequestMethod.GET, {}, (data) => {
        let arr = [" |Choose Category"];
        data.map((e) => {
            let icon = JSON.parse(e.icon)
            arr.push({ text: e.name, image: window.host + icon.thumbImages[0], sub_category: e.sub_category });
            return null;
        });
        setCatories(arr)
    })

    useEffect(() => {
        if (!start) {
            setStart(true)
        }
    }, [])



    return (
        <div>
            <SizeBox height={20} />
            <div className='w-full px-1 py-0 bg-white rounded-md hv-85'>
                <Navigation axis={NavigationAxis.Vertical} showLable={false}>
                    <TextIcon text={"Categories"} useLink={false} textStyle={"text-xl font-bold"} Icon={MdCategory} iconSize={30} />
                    <DropMenu listItems={categories} />
                </Navigation>
            </div>
        </div>
    )
}
