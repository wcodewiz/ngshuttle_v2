import { LabelSelect } from "./LabelSelect"

export const SelectWrapper = ({ name, className, change, icon, iconSize, click, selected, values, ref }) => {
    return <LabelSelect name={name} change={change} click={click} icon={icon} selected={selected} iconSize={iconSize} ref={ref} className={className} values={values} />
}
