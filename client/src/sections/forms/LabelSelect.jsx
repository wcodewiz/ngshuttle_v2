import React from 'react'
import { List } from '../components/List'
import { Select } from './Select'

export const LabelSelect = (props) => {
    let empty = () => { }
    return <List>
        <div className={`flex justify-between px-2 py-2 ${props.className ?? ""}`}>
            {props.icon && <props.icon fontSize={props.iconSize ?? 20} />}
            <span className='hidden' ref={props.ruleRef ?? null}>{props.rules ?? ""}</span>
            <Select ref={props.ref ?? null}
                name={props.name ?? ""}
                click={props.click ?? empty}
                change={props.change ?? empty}
                values={props.values ?? []}
                selected={props.selected ?? ""}
                className={"w-full"} />
        </div>
    </List>

}
