import { useRef } from 'react'
import { SimpleList } from './SimpleList'
import { List } from './List';
import { NavigationAxis } from '../../core/enums/main';
import { Link } from 'react-router-dom';

export const DropMenu = ({ listItems }) => {
    let drop = useRef();


    const getSubCategory = (categories) => {
        let headding = []; let heads = [];
        if (categories.length > 0) {
            for (let k = 0; k < categories.length; k++) {
                let meta_group = categories[k].meta_group
                if (heads.indexOf(meta_group) === -1) {
                    headding.push(categories[k])
                    heads.push(meta_group);
                }
            }

        }


        return (headding.length > 0) &&
            headding.map((g, i) => <div className='w-3/6 h-auto my-4' key={i}> <List className='flex-wrap w-full' axis={NavigationAxis.Vertical} >
                <h4 className='font-bold text-sm bg-gray-100 rounded-lg mx-4 px-2 text-center'>{g.meta_group}</h4>
                {categories.filter((e, i) => e.meta_group === g.meta_group).map((k, i) => <Link className='font-bold text-sm px-4 mx-2 text-gray-500 hover:text-gray-800 transition-all duration-500' to={"#"} >{k.name} </Link>)}
            </List ></div>);


    }

    const hoverMouse = (index) => {
        document.querySelectorAll(`[class*="sidebar-options-"]`).forEach(e => {
            if (!e.classList.contains("hidden")) {
                e.classList.add("hidden")
            }
        })

        let drop = document.querySelector(".sidebar-options-" + index)
        if (drop) {
            if (drop.classList.contains("hidden")) {
                drop.classList.remove("hidden")
                document.onclick = () => {
                    if (!drop.classList.contains("hidden")) {
                        drop.classList.add("hidden")
                    }
                }
            }
        }
    }

    return <div className='relative z-10'>
        {listItems && listItems.filter((e) => e !== " ").map((e, i) =>
            <span key={i}>
                <SimpleList hover={(ev) => hoverMouse(i)} imageWidth={"20px"}  {...e} />
                <div ref={drop} className={`absolute top-0  bg-gray-200 h-full rounded-md hidden sidebar-options-${i} pt-5`} style={{ width: "500px", left: "90%" }}>
                    {e.sub_category && <List axis={NavigationAxis.Horizontal} className='flex-wrap'>{getSubCategory(e.sub_category)}</List>}
                </div>

            </span>

        )}

    </div>
}
