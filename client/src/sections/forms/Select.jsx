import React from 'react'

export const Select = React.forwardRef((props, ref) => {
    const empty = () => { }
    return <select tabIndex={-30} autoComplete='Off' ref={ref ?? null} name={props.name ?? ""} onClick={props.click ?? empty} onChange={props.change ?? empty} className={`bg-transparent hover:border-none focus:border-none focus:outline-none ${props.className ?? ""}`}  >
        {props.values.filter((e, i) => props.selected === e).map((e, i) => <option key={i} selected value={`${e}`.split("|")[0].toLowerCase()}>{`${e}`.split("|")[1].toUpperCase()}</option>)}
        {props.values.filter((e, i) => props.selected !== e).map((e, i) => <option key={i} value={`${e}`.split("|")[0].toLowerCase()}>{`${e}`.split("|")[1].toUpperCase()}</option>)}
    </select>

})
