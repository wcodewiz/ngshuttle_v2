import React from 'react'
import RightBottomModal from './RightBottomModal'
import { List } from './List'
import { Button } from './Button'
import { AiFillGoogleCircle } from 'react-icons/ai'

export const LoginAdv = ({ show }) => {
    return <RightBottomModal closeable={true} show={show}>
        <h4 className="w-full px-4 py-2 text-2xl font-bold text-center">Welcome To {window.appName}</h4>
        <p className="px-1 py-2 font-sans text-xl font-semibold">Login to enjoy {window.appName}'s goodies!!</p>
        <List>
            <div className="w-5/6">
                <Button text={"Login"} className={"bg-sky-600 text-white hover:bg-sky-700 duration-300 transition-all w-5/6 rounded-md  font-bold"} />
                <span>or</span>
            </div>
            <a href="#googleLogin">
                <AiFillGoogleCircle fontSize={50} className="text-rose-600" />
            </a>


        </List>
    </RightBottomModal>

}
