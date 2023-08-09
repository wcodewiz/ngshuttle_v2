import React, { useContext } from 'react'
import { ModalDialog } from './ModalDialog'
import { FormWrapper } from '../forms/FormWrapper'
import { Button } from './Button'
import { List } from './List'
import { AccountForms, NavigationAxis, ProcessType, RequestMethod } from '../../core/enums/main'
import { AiFillFacebook, AiFillGoogleCircle, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai'
import { FormFooter } from './FormFooter'
import { AppContext } from '../../core/context/AppContext'
import { MutatingDots } from 'react-loader-spinner'

export const Account = ({ show, showAlt = true, useModal = true, submit = null, heading, btnText, HeadIcon, formPath, showError, success, onLoad, error, method = RequestMethod.POST, rule = {}, formType = AccountForms.Login, children = [], altexT = "Login Using....", iconSize = 20 }) => {
    const { app } = useContext(AppContext)


    if (app.process === ProcessType.Loading) {
        return <ModalDialog show={show} className='pt-20'>
            <div className='flex flex-col items-center justify-center w-3/6 mx-auto h-4/6'>
                <span className='mx-4 text-xl font-bold text-center text-rose-600'>Processing...</span>
                <MutatingDots
                    height="100"
                    width="100"
                    color="#4fa94d"
                    secondaryColor='#4fa94d'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </ModalDialog>
    }

    if (!useModal) {
        return <FormWrapper path={formPath} onSuccess={success} submit={submit} onError={error} method={method} onLoad={onLoad} showErrors={showError} className="my-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-rose-700 scrollbar-track-rose-200 h-5/6" rules={rule}>
            <div className='w-4/6 py-5 pb-2 mx-auto my-1 shadow'>
                {heading && <h3 className='flex items-center justify-center px-8 py-2 my-1 text-xl font-bold text-black capitalize'>{heading}{HeadIcon && <HeadIcon iconsize={20} />}</h3>}
                {children}
                <div className='flex items-center justify-center w-full'>
                    <Button type={"submit"} text={btnText ?? "submit"} className={"px-5 py-4 w-4/6 mx-auto bg-rose-600 text-white rounded-full hover:bg-rose-500 duration-300 transition-all"} />
                </div>
                <FormFooter formType={formType} />


                <div className='w-4/6 mx-auto my-10'>
                    {showAlt && <List axis={NavigationAxis.Vertical}>
                        <h6 className='mx-auto my-5 text-sm font-bold'>{altexT}</h6>
                        <List axis={NavigationAxis.Horizontal}>
                            <AiFillGoogleCircle fontSize={50} className='cursor-pointer text-rose-600' />
                            <AiFillTwitterCircle fontSize={50} className='cursor-pointer text-sky-600' />
                            <AiFillLinkedin fontSize={50} className='text-blue-600 cursor-pointer' />
                            <AiFillFacebook fontSize={50} className='text-blue-600 cursor-pointer' />

                        </List>

                    </List>}
                </div>

            </div>
        </FormWrapper>
    }



    return <ModalDialog show={show} className='pt-20'>
        <FormWrapper path={formPath} onSuccess={success} submit={submit} onError={error} method={method} onLoad={onLoad} showErrors={showError} className="my-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-rose-700 scrollbar-track-rose-200 h-5/6" rules={rule}>
            <div className='w-4/6 py-5 pb-2 mx-auto my-1 shadow'>
                {heading && <h3 className='flex items-center justify-center px-8 py-2 my-1 text-xl font-bold text-black capitalize'>{heading}{HeadIcon && <HeadIcon iconsize={20} />}</h3>}
                {children}
                <div className='flex items-center justify-center w-full'>
                    <Button type={"submit"} text={btnText ?? "submit"} className={"px-5 py-4 w-4/6 mx-auto bg-rose-600 text-white rounded-full hover:bg-rose-500 duration-300 transition-all"} />
                </div>
                <FormFooter formType={formType} />


                <div className='w-4/6 mx-auto my-10'>
                    {showAlt && <List axis={NavigationAxis.Vertical}>
                        <h6 className='mx-auto my-5 text-sm font-bold'>{altexT}</h6>
                        <List axis={NavigationAxis.Horizontal}>
                            <AiFillGoogleCircle fontSize={50} className='cursor-pointer text-rose-600' />
                            <AiFillTwitterCircle fontSize={50} className='cursor-pointer text-sky-600' />
                            <AiFillLinkedin fontSize={50} className='text-blue-600 cursor-pointer' />
                            <AiFillFacebook fontSize={50} className='text-blue-600 cursor-pointer' />

                        </List>

                    </List>}
                </div>

            </div>
        </FormWrapper>
    </ModalDialog>
}
