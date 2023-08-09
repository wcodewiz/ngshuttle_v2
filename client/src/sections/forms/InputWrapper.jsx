import { LabelInput } from "./LabelInput"

export const InputWrapper = ({ name, className, change, icon, iconSize, isMany, placeholder, type, ref, label }) => {
    return <LabelInput name={name} label={label} className={className} isMany={isMany} icon={icon} iconSize={iconSize} placeholder={placeholder} type={type} ref={ref} change={change} />
}
