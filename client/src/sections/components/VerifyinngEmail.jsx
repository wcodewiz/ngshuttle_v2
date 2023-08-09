/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react'
import { SizeBox } from './SizeBox'
import { ModalDialog } from './ModalDialog'
import { Triangle } from 'react-loader-spinner'
import useApi from '../../useApi'
import { AppPops, RequestMethod } from '../../core/enums/main'
import { AppContext } from '../../core/context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillWarning } from 'react-icons/ai'
import { Path } from '../../core/paths'
import { Utility } from '../../Utility'


export const VerifyingEmail = () => {
    const { hash } = useParams();
    const { app, setApp } = useContext(AppContext)
    const [rerrors, setrErrors] = useState(null);
    const [start, setStart] = useState(false)
    const navigate = useNavigate();


    useApi(start, `account/verify/email/${hash}`, RequestMethod.DELETE, {}, (data) => {
        let timer = setTimeout(() => {
            if (data.valid) {
                let profile = { ...app.profile, mail_verified: true };
                setApp({ ...app, appPops: AppPops.SHOW_EMAILVERIFIED, profile: profile })
                Utility.save("user", profile);
                let flash = setTimeout(() => {
                    setApp({ ...app, appPops: AppPops.NONE })
                    clearTimeout(flash)
                }, 1500);
                setStart(false)
                clearTimeout(timer)
                navigate(Path.Homepage);
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



    return (
        <div className="w-5/6 mx-auto">
            <SizeBox height={20} />

            {<ModalDialog closeable={false} show={true} className='pt-20'>
                <div className='flex flex-col items-center justify-center w-3/6 mx-auto h-4/6'>
                    <span className='mx-4 text-xl font-bold text-center text-rose-600'>Verifying Email Token...</span>
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
