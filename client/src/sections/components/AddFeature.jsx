import React, { useState, useEffect } from 'react'
import { ModalDialog } from './ModalDialog'
import { List } from './List'
import { AccountForms, Feature, NavigationAxis, RequestMethod } from '../../core/enums/main'
import { ALinksRounded } from './ALinks'
import { Account } from './Account'
import { Utility } from '../../Utility'
import { InputWrapper } from '../forms/InputWrapper'
import { AiFillAccountBook, AiFillCheckCircle, AiFillDashboard, AiFillFileImage, AiFillWarning, AiOutlineUser } from 'react-icons/ai'
import useApi from '../../useApi'
import { SelectWrapper } from '../forms/SelectWrapper '

export const AddFeature = ({ show }) => {
    const [errors, setErrors] = useState(null);
    const [done, setDone] = useState(null);
    const [topError, setTopError] = useState(null)
    const [selected, setSelected] = useState(Feature.AddCategory);
    const [start, setStart] = useState(false);
    const [categories, setCatories] = useState(null);

    useApi(start, "category/get", RequestMethod.GET, {}, (data) => {
        let arr = [" |Choose Category"];
        data.map((e) => {
            arr.push(`${e.id}|${`${e.name}`.toUpperCase()}`);
            return null;
        });
        setCatories(arr);
    })

    useEffect(() => {
        if (!start) {
            setStart(true)
        }
    }, [])


    const rule = {
        icon: ["required|Category Icon required", "mimes:png"],
        name: ["required|Category name required"],
    };
    const rule2 = {
        icon: ["required|Category Icon required", "mimes:png"],
        name: ["required|Category name required"],
        meta_group: ["required|Sub category group meta"],
        category: ["required|Category is required"],
    }
    const success = (data) => {
        let message = data.message;
        setDone(message);
        setTopError(null)
        let timer = setTimeout(() => {
            setDone(null)
            clearTimeout(timer);
        }, 5000);


    }
    const response_error = (data) => {
        setTopError(data.message ?? "something went wrong")
    }
    const displayError = (data) => {
        setErrors(Utility.parseErrors(data))
    }

    const submit = () => {

    }


    return <ModalDialog show={show}>
        <div className='w-full h-5/6 px-0 flex justify-between mt-10'>
            <div className='px-4 w-2/6 relative'>
                <List axis={NavigationAxis.Vertical} className='px-4 my-5'>
                    <h4 className='px-4 py-2 font-bold text-gray-400'>Menus</h4>
                    <ALinksRounded className="rounded-full bg-gray-200 text-gray-800 font-bold my-4 hover:bg-gray-100 transition-all duration-300" link={""} onClick={() => setSelected(Feature.AddCategory)} content={"Add Category"} />
                    <ALinksRounded className="rounded-full bg-gray-200 text-gray-800 font-bold my-4 hover:bg-gray-100 transition-all duration-300" link={""} onClick={() => setSelected(Feature.AddSubCategory)} content={"Add Sub Category"} />
                </List>
            </div>
            <div className='w-4/6 relative mx-1 border border-gray-50'>
                {selected === Feature.AddCategory && <Account useModal={false} formType={AccountForms.ChangePassword} submit={submit} showAlt={false} btnText={"Add"} success={success} error={response_error} formPath={"category/add"} show={show} showError={displayError}
                    rule={rule} heading={"Add Category"} HeadIcon={AiFillDashboard} >
                    {topError && <span className='flex items-center justify-center font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{topError}</span>}
                    {done && <span className='flex items-center justify-center font-sans text-xs font-bold text-green-600'><AiFillCheckCircle fontSize={13} />{done}</span>}
                    <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"name"} placeholder={"Enter Category Name"} icon={AiOutlineUser} iconSize={25} type={"text"} />
                    <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"icon"} label={"Category icon eg. png only"} icon={AiFillFileImage} iconSize={25} type={"file"} />
                    <div className='flex flex-col w-4/6 h-auto px-2 mx-auto my-3'>{errors && errors.map((e, i) => <span key={i} className='flex justify-start my-1 font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{e}</span>)}</div>
                </Account >}

                {selected === Feature.AddSubCategory && <Account useModal={false} formType={AccountForms.ChangePassword} submit={submit} showAlt={false}
                    btnText={"Add"} success={success} error={response_error} formPath={"sub/category/add"} show={show} showError={displayError}
                    rule={rule2} heading={"Add Sub Category"} HeadIcon={AiFillDashboard} >
                    {topError && <span className='flex items-center justify-center font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{topError}</span>}
                    {done && <span className='flex items-center justify-center font-sans text-xs font-bold text-green-600'><AiFillCheckCircle fontSize={13} />{done}</span>}
                    <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"name"} placeholder={"Enter Sub Category Name"} icon={AiOutlineUser} iconSize={25} type={"text"} />
                    <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"meta_group"} placeholder={"Enter Sub Category Meta group"} icon={AiOutlineUser} iconSize={25} type={"text"} />
                    <SelectWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"category"} icon={AiFillAccountBook} iconSize={25} selected={" "} values={categories && categories} />
                    <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"icon"} label={"Sub Category icon eg. png only"} icon={AiFillFileImage} iconSize={25} type={"file"} />
                    <div className='flex flex-col w-4/6 h-auto px-2 mx-auto my-3'>{errors && errors.map((e, i) => <span key={i} className='flex justify-start my-1 font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{e}</span>)}</div>
                </Account >}


            </div>

        </div>
    </ModalDialog>
}
