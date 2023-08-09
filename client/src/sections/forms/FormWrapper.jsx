/* eslint-disable no-loop-func */
import { useContext, useState } from "react"
import { Utility } from "../../Utility";
import useApi from "../../useApi";
import { RequestMethod } from "../../core/enums/main";
import { AppContext } from "../../core/context/AppContext";
import { useEffect, useRef } from "react"

export const FormWrapper = ({ path, className, submit = null, method = RequestMethod.POST, onLoad = () => { }, children = [], showErrors = (errors) => { }, onSuccess = (data) => { }, onError = (data) => { }, rules = {} }) => {
    const [data, setData] = useState(null)
    const [enable, setEnable] = useState(false);
    useApi(enable, path, method, data, onSuccess, onError)
    let { app, setApp } = useContext(AppContext);
    const form = useRef()


    useEffect(() => {
        form.current.reset();

    }, [form])

    const msubmit = (ev) => {
        ev.preventDefault();
        setApp({ ...app, currentInput: {} });
        submit && submit();

        var validInput = true;
        let formdata = new FormData();
        let errors = {};
        for (let i in rules) {
            let key = ev.target[i];
            let value = rules[i]
            let error = [];

            for (let m = 0; m < value.length; m++) {
                let e = `${value[m]}`.toLowerCase();
                if (`${e}`.indexOf("required") !== -1) {
                    let errValue = `${e}`.split("|")[1]
                    if (!Utility.required(key.value)) {
                        error.push(errValue)
                        if (!key.classList.contains("bg-red-200"))
                            key.classList.add("bg-red-200")
                    }
                }
                if (`${e}`.indexOf("max") !== -1) {
                    let max = `${e}`.split(":")[1]
                    max = parseInt(max);
                    if (key.value.length > max) {
                        error.push(`The ${i} field must be less than ${max}`);
                        if (!key.classList.contains("bg-red-200"))
                            key.classList.add("bg-red-200")
                    }
                }
                if (`${e}`.indexOf("min") !== -1) {
                    let max = `${e}`.split(":")[1]
                    max = parseInt(max);
                    if (key.value.length < max) {
                        error.push(`The ${i} field must be at least ${max} minimium characters`);
                        if (!key.classList.contains("bg-red-200"))
                            key.classList.add("bg-red-200")
                    }

                }
                if (`${e}`.indexOf("mimes") !== -1) {
                    let mimes = `${e}`.split(":")[1].split(",");
                    for (let c = 0; c < key.files.length; c++) {
                        let file = key.files[c];
                        let isImage = false;
                        let extension = file.type.split("/")[1]
                        for (let j = 0; j < mimes.length; j++) {
                            if (extension === mimes[j]) {
                                isImage = true;
                                formdata.append(`${i}-${c}`, file);
                                break;
                            }
                        }
                        if (!isImage) {
                            error.push(`${file.name} unsupported file extension or image *${mimes.join(",")} required`);
                            if (!key.classList.contains("bg-red-200"))
                                key.classList.add("bg-red-200")
                        }
                    }


                }
                if (`${e}`.indexOf("email") !== -1) {
                    if (!Utility.email(key.value)) {
                        error.push(`invalid email address ${key.value}`);
                        if (!key.classList.contains("bg-red-200"))
                            key.classList.add("bg-red-200")
                    }
                }
            }
            validInput = error.length <= 0;
            (validInput && key.type !== "file") && formdata.append(i, key.value);

            if (!validInput) {
                errors = { ...errors, [i]: error }
            } else {
                if (key.classList.contains("bg-red-200"))
                    key.classList.remove("bg-red-200")

            }

        }

        if (!validInput) {
            if (showErrors) {
                showErrors(errors);
            }
            return false;
        } else {
            setData(formdata);
            console.log(formdata)
            if (onLoad) onLoad();

            let timer = setTimeout(() => {
                setEnable(true);
                clearTimeout(timer)
            }, 200);
            return true;
        }


    }

    //console.log(all)

    return (
        <form ref={form} onSubmit={msubmit} className={className}>
            {children}
        </form>
    )
}
