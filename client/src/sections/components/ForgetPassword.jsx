import React, { useContext, useState } from 'react'
import { InputWrapper } from '../forms/InputWrapper'
import { AiFillCheckCircle, AiFillLock, AiFillWarning, AiOutlineUser } from 'react-icons/ai'
import { Account } from './Account'
import { AppContext } from '../../core/context/AppContext'
import { AccountForms } from '../../core/enums/main'
import { FlashMessage } from './FlashMessage'
import { Utility } from '../../Utility'




const ForgetPassword = ({ show }) => {
    let { app } = useContext(AppContext);
    const [topError, setTopError] = useState(null)
    const [errors, setErrors] = useState(null);
    const [done, setDone] = useState(null);
    const rule = {
        email: ["required|The email field is required", "email"],
    }
    const success = (data) => {
        let message = data.message;
        setDone(message);

    }
    const response_error = (data) => {
        setTopError(data.message ?? "something went wrong!!")
    }
    const displayError = (data) => {
        setErrors(Utility.parseErrors(data))
    }





    return <Account formType={AccountForms.ForgetPassword} success={success} error={response_error} formPath={"account/forget/password"} show={show} btnText={"recover"} showError={displayError} rule={rule} heading={"Account Recovery"} HeadIcon={AiFillLock} >
        {topError && <FlashMessage milesec={200}><span className='flex items-center justify-center font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{topError}</span></FlashMessage>}
        {done && <span className='flex items-center justify-center font-sans text-xs font-bold text-green-600'><AiFillCheckCircle fontSize={13} />{done}</span>}
        <InputWrapper value={app.currentInput && app.currentInput.email} className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"email"} placeholder={"Email Address"} icon={AiOutlineUser} iconSize={25} type={"text"} />
        <div className='w-4/6 px-2 mx-auto my-3 '>{errors && errors.map((e, i) => <span key={i} className='flex justify-start font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{e}</span>)}</div>
    </Account >
}

export default ForgetPassword