import React, { useContext, useState } from 'react'
import { InputWrapper } from '../forms/InputWrapper'
import { AiFillCheckCircle, AiFillLock, AiFillWarning, AiOutlineUser } from 'react-icons/ai'
import { Account } from './Account'
import { AppContext } from '../../core/context/AppContext'
import { AccountForms, AppPops } from '../../core/enums/main'
import { Utility } from '../../Utility'

const Register = ({ show }) => {
    let { app, setApp } = useContext(AppContext);
    const [topError, setTopError] = useState(null)
    const [errors, setErrors] = useState(null);
    const [done, setDone] = useState(null);
    const rule = {
        email: ["required|The email field is required", "email"],
        password: ["required|The password field is required", "min:6"],
    }
    const success = (data) => {
        let message = data.message;
        setDone(message);
        let timer = setTimeout(() => {
            if (Utility.save("user", data)) {
                setDone(null)
                clearTimeout(timer);
                setApp({ ...app, appPops: AppPops.NONE, profile: data, access: Utility.accessNamesToEnum(data.role) })
            }

        }, 1000);


    }
    const response_error = (data) => {
        setTopError(data.message ?? "something went wrong")
    }
    const displayError = (data) => {
        setErrors(Utility.parseErrors(data))
    }



    return <Account altexT='create account using...' formType={AccountForms.Signup} btnText={"Create Account"} success={success} error={response_error} formPath={"account/create"} show={show} showError={displayError} rule={rule} heading={"Register"} HeadIcon={AiFillLock} >
        {topError && <span className='flex items-center justify-center font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{topError}</span>}
        {done && <span className='flex items-center justify-center font-sans text-xs font-bold text-green-600'><AiFillCheckCircle fontSize={13} />{done}</span>}
        <InputWrapper value={app.currentInput && app.currentInput.email} className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"email"} placeholder={"Email Address"} icon={AiOutlineUser} iconSize={25} type={"text"} />
        <InputWrapper value={app.currentInput && app.currentInput.password} className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"password"} placeholder={"Password"} icon={AiFillLock} iconSize={25} type={"password"} />
        <div className='w-4/6 px-2 mx-auto my-3 '>{errors && errors.map((e, i) => <span key={i} className='flex justify-start font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{e}</span>)}</div>
    </Account >
}

export default Register