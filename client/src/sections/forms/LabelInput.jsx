import React from 'react'
import { Input } from './Input'
import { List } from '../components/List'

export const LabelInput = (props) => {
    let empty = () => { }
    return <List>
        <div className={`px-2 py-2 ${props.className ?? ""}`}>

            {props.label && <label className='px-4 my-2 text-sm font-bold text-gray-400'>{props.label}</label>}
            <div className={`flex justify-between border border-gray-400 w-full px-2 py-2 ${props.className ?? ""}`}>
                {props.icon && <props.icon fontSize={props.iconSize ?? 20} />}
                <span className='hidden' ref={props.ruleRef ?? null}>{props.rules ?? ""}</span>
                <Input isMany={props.isMany} ref={props.ref ?? null}
                    name={props.name ?? ""}
                    type={props.type ?? "text"}
                    placeholder={props.placeholder ?? ""}
                    click={props.click ?? empty}
                    change={props.change ?? empty}
                    value={props.value ?? ""}
                    className={"w-full"} />
            </div>
        </div>
    </List>

}
