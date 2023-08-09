import { ShimmerEffectTypes } from "./std";
import "../../lib/styles.css"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { dummyArt } from "../../../assets";


export const Shimmer = ({ src, className, alt, width, height, imageWidth, imageHeight, shimmerEffectTypes = ShimmerEffectTypes.SHIMMER, bgColor = "bg-gray-200" }) => {
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);
    const [image, setImage] = useState("");
    const [fetchImage, setFetchImage] = useState(false);
    const [loadErr, setLoadError] = useState(false);
    let idea = useRef();
    const id = 20;



    useEffect(() => {
        if (src !== undefined) {

            try {
                let observer = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) {

                        if (src.indexOf("http") !== -1) {
                            setImage(src)
                            setLoading(false);
                        } else {
                            setFetchImage(true)
                        }
                        observer.unobserve(entry.target);
                    }

                    return () => observer.disconnect();
                })
                observer.observe(idea.current)
            } catch (e) { }

        }

    }, [id, src])


    if (fetchImage && loading && !started) {
        setStarted(true)
        axios.get(src, {
            responseType: "blob"
        }).then(success => {
            setImage(URL.createObjectURL(success.data));
            setLoading(false);
        }, err => {
            setLoadError(true);
        })
        setFetchImage(false);
    }


    if (loading) {
        switch (shimmerEffectTypes) {
            case ShimmerEffectTypes.SHIMMER:
                return <div ref={idea} style={{ width: `${width}px`, height: `${height}px` }} className={`shimmer`}></div>
            case ShimmerEffectTypes.BREATHING:
                return <div ref={idea} style={{ width: `${width}px`, height: `${height}px` }} className={`breathing`}></div>
            default:
                return <div ref={idea} style={{ width: `${width}px`, height: `${height}px` }} className={`breathing`}></div>

        }
    }

    if (loadErr) {
        return <img src={dummyArt} alt={alt} style={{ fontSize: ".5rem", width: `${imageWidth}`, height: `${imageHeight}` }} className={`fade-in animate-jump animate-once ${className}`} />
    }


    return <img src={image} alt={alt} style={{ fontSize: ".5rem", width: `${imageWidth}`, height: `${imageHeight}` }} className={`fade-in animate-jump animate-once ${className}`} />

}

