import { useRef } from "react"
import { Link } from "react-router-dom";
import { v4 } from "uuid"


export const NavigationItem = ({ Icon, fontSize = 30, items = 3, link = "#item", animate = false, title = null, children = [], moveLeft = 0, height = 60, width = 100 }) => {
    const itemId = `${v4().toString()}`;

    const openDrop = () => {
        let items = document.querySelectorAll(".navigation-items");
        let drops = document.querySelectorAll("#drops");
        let target = document.querySelector(`.navigation-items-${itemId}`);

        items.forEach(e => {
            if (!e.classList.contains("hidden"))
                e.classList.add("hidden");
        })
        drops.forEach(e => {
            if (!e.classList.contains("hidden"))
                e.classList.add("hidden");
        })

        if (target.classList.contains("hidden")) {
            target.classList.remove("hidden");
        } else {
            target.classList.add("hidden")
        }

    }

    return (<>
        <Link className='relative flex items-center justify-center px-4 mx-4 transition-all duration-200 bg-green-200 rounded-md shadow realtive hover:bg-green-50' to={link} onClick={openDrop}><Icon className={`text-rose-600 ${animate ? "animate-spin" : ""}`} title={title ?? ""} fontSize={fontSize} />  {items > 0 && <span className='absolute top-0 px-1 py-0 text-xs text-white bg-red-600 rounded-md right-1'>{items}</span>} </Link>
        <div style={{ left: `${moveLeft}%`, height: `${height}vh`, width: `${width}%` }} className={`absolute hidden  bg-white rounded-md shadow-lg top-full navigation-items navigation-items-${itemId}`} >
            {title && <h4 className='px-4 py-2 text-sm font-bold text-gray-800 capitalize'>{title}</h4>}
            <div className="w-full overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-rose-600 scrollbar-track-rose-100 h-5/6">
                {children}
            </div>
        </div>
    </>)
}
