import "./loaderStyle.css";


const LoadingIcon = () => {


    return <div className='z-20 absolute bottom-0 left-0  w-full bg-green-200 loaderanim'>
        <div style={{ width: "100%" }} className="bg-green-700 p-0 m-0  rounded-r-lg h-full transition-all duration-300 loader-thumb"></div>
    </div>


}

export default LoadingIcon