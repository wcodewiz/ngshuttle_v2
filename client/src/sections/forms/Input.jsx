import React from 'react'
import { File } from './File'

export const Input = React.forwardRef((props, ref) => {
    const empty = () => { }
    return (props.type && props.type === "file") ? <File {...props} /> :
        <input tabIndex={-30} autoComplete='Off' ref={ref ?? null} name={props.name ?? ""} type={props.type ?? "text"}
            placeholder={props.placeholder ?? ""} onClick={props.click ?? empty} onChange={props.change ?? empty}
            defaultValue={props.value ?? ""} className={`bg-transparent hover:border-none focus:border-none focus:outline-none ${props.className ?? ""} `} />

})
