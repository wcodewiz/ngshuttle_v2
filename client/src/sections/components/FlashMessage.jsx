/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export const FlashMessage = ({ children, milesec }) => {
    const [show, setShow] = useState(true)

    useEffect(() => {

        let timer = setTimeout(() => {
            setShow(false);
            clearTimeout(timer);
        }, milesec)

    }, milesec)

    return show && { children }
}
