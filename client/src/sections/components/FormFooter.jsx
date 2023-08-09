import React, { useContext } from 'react'
import { AccountForms, AppPops, NavigationAxis } from '../../core/enums/main'
import { List } from './List'
import { Button } from './Button'
import { AppContext } from '../../core/context/AppContext'

export const FormFooter = ({ formType }) => {
    const { app, setApp } = useContext(AppContext);
    if (formType === AccountForms.Login)
        return <List axis={NavigationAxis.Vertical} className='mx-6'>
            <div className='my-3'>
                <span className='block'>Don't have an Account?</span>
                <Button onClick={() => setApp({ ...app, appPops: AppPops.REGISTER })} text={"Register"} className={"bg-sky-500 text-gray-200 rounded-full w-2/6 whitespace-nowrap hover:bg-sky-600 duration-300 transition-all"} />
            </div>
            <div>
                <Button onClick={() => setApp({ ...app, appPops: AppPops.FORGETPASSWORD })} text={"Forgotten Password"} className={"bg-green-200 text-black rounded-full  whitespace-nowrap hover:bg-green-600 duration-300 transition-all"} />
            </div>


        </List>
    if (formType === AccountForms.Signup)
        return <List axis={NavigationAxis.Vertical}>
            <div>
                <span>Already have an Account?</span>
                <Button onClick={() => setApp({ ...app, appPops: AppPops.LOGIN })} text={"Login"} className={"bg-sky-500 text-gray-200 rounded-full w-2/6 whitespace-nowrap hover:bg-sky-600 duration-300 transition-all"} />
            </div>

        </List>
    if (formType === AccountForms.ForgetPassword)
        return <List axis={NavigationAxis.Vertical}>
            <div>
                <span>Don't have an Account?</span>
                <Button onClick={() => setApp({ ...app, appPops: AppPops.REGISTER })} text={"Register"} className={"bg-sky-500 text-gray-200 rounded-full w-2/6 whitespace-nowrap hover:bg-sky-600 duration-300 transition-all"} />
            </div>

        </List>
    if (formType === AccountForms.ChangePassword)
        return <List axis={NavigationAxis.Vertical}>
            <></>
        </List>

}
