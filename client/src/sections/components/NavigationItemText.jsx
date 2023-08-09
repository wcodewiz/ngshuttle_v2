import { Link } from "react-router-dom"
import { Badge } from "./Badge"


export const NavigationItemText = ({ text, click = () => { }, items = 3, link = "#item", animate = false, className = 'relative flex items-center px-4 py-2 mx-4 my-2 text-sm font-bold transition-all duration-300 bg-purple-100 rounded-md hover:bg-purple-50 whitespace-nowrap' }) => {
    return (<>
        <Link className={className} onClick={click} to={link} ><span className={`text-purple-950 ${animate ? "animate-spin" : ""}`} >{text}</span>  {items > 0 && <Badge count={items} />} </Link>

    </>)
}
