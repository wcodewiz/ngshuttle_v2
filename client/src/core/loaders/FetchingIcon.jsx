import { useContext } from "react"
import { AppContext } from "../context/AppContext";
import "./loaderStyle.css";

const FetchingIcon = () => {
    const [app] = useContext(AppContext)


    return (percent >= app.progressPercent) ?
        <></>
        : <div className='z-20 absolute bottom-0 left-0  w-full bg-rose-200 loaderanim' >
            <div style={{ width: `${app.progressPercent ?? 2}%` }} className="bg-rose-700 p-0 m-0  rounded-r-lg h-full transition-all duration-300 loader-thumb"></div>
        </div >

}

export default FetchingIcon