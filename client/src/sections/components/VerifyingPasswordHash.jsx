/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react'
import { SizeBox } from './SizeBox'
import { ModalDialog } from './ModalDialog'
import { Triangle } from 'react-loader-spinner'
import useApi from '../../useApi'
import { AccountForms, AppPops, RequestMethod } from '../../core/enums/main'
import { Utility } from '../../Utility'
import { AppContext } from '../../core/context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Account } from './Account'
import { AiFillCheckCircle, AiFillLock, AiFillWarning } from 'react-icons/ai'
import { InputWrapper } from '../forms/InputWrapper'
import { Path } from '../../core/paths'


export const VerifyingPasswordHash = () => {
    const { hash } = useParams();
    const [data, setShowData] = useState(null)
    const { app, setApp } = useContext(AppContext)
    const [topError, setTopError] = useState(null)
    const [errors, setErrors] = useState(null);
    const [rerrors, setrErrors] = useState(null);
    const [done, setDone] = useState(null);
    const [start, setStart] = useState(false)
    const [changePasseword, setChangePassword] = useState(false);
    const navigation = useNavigate();


    useApi(start, `account/verify/password/${hash}`, RequestMethod.DELETE, {}, (data) => {
        setShowData(data);
        let timer = setTimeout(() => {
            if (Utility.save("user", data)) {
                clearTimeout(timer);
                setApp({ ...app, appPops: AppPops.NONE, profile: data, access: Utility.accessNamesToEnum(data.role) })
                setChangePassword(data.valid)
            }

        }, 1000);


    }, (data) => {
        setrErrors(data.message ?? "something went wrong!!")
    })


    useEffect(() => {
        if (!start) {
            setStart(true)
        }
    }, [])


    const rule = {
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
                navigation(Path.Homepage);
            }

        }, 1000);


    }
    const response_error = (data) => {
        setTopError(data.message ?? "something went wrong")
    }
    const displayError = (data) => {
        let errors = "";
        for (let key in data) {
            errors += data[key].join(",")
        }
        setErrors(errors.split(","))
    }


    return (
        <div className="w-5/6 mx-auto">
            <SizeBox height={20} />

            {changePasseword && data && <Account altexT='' formType={AccountForms.ChangePassword} btnText={"Save Changes"} success={success} error={response_error} formPath={`account/change/password/${data && data.id}`} show={true} showError={displayError} rule={rule} heading={"Change New Password"} HeadIcon={AiFillLock} >
                {topError && <span className='flex items-center justify-center font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{topError}</span>}
                {done && <span className='flex items-center justify-center font-sans text-xs font-bold text-green-600'><AiFillCheckCircle fontSize={13} />{done}</span>}
                <InputWrapper value={app.currentInput && app.currentInput.password} className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"password"} placeholder={"Password"} icon={AiFillLock} iconSize={25} type={"text"} />
                <div className='w-4/6 px-2 mx-auto my-3 '>{errors && errors.map((e, i) => <span key={i} className='flex justify-start font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{e}</span>)}</div>
            </Account >
            }

            {data === null && <ModalDialog closeable={false} show={true} className='pt-20'>
                <div className='flex flex-col items-center justify-center w-3/6 mx-auto h-4/6'>
                    <span className='mx-4 text-xl font-bold text-center text-rose-600'>Verifying Password Token...</span>
                    <Triangle
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>
            </ModalDialog>
            }

            {rerrors !== null && <ModalDialog closeable={false} show={true} className='pt-20'>
                <div className='flex flex-col items-center justify-center w-3/6 mx-auto h-4/6'>
                    <span className='mx-4 text-xl font-bold text-center text-rose-600'>{rerrors}</span>
                    <AiFillWarning fontSize={64} className='text-rose-800' />
                </div>
            </ModalDialog>
            }



        </div>
    )
}
