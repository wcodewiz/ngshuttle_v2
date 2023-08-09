import React, { useContext, useState } from 'react'
import { InputWrapper } from '../forms/InputWrapper'
import { AiFillCheckCircle, AiFillCompass, AiFillFileImage, AiFillShop, AiFillWarning, AiOutlineUser } from 'react-icons/ai'
import { Account } from './Account'
import { AccountForms, Country } from '../../core/enums/main'
import { Utility } from '../../Utility'
import { SelectWrapper } from '../forms/SelectWrapper '
import { AppContext } from '../../core/context/AppContext'
import { ModalDialog } from './ModalDialog'

const BeMerchant = ({ show }) => {
    const [topError, setTopError] = useState(null)
    const { app, setApp } = useContext(AppContext)
    const [errors, setErrors] = useState(null);
    const [countryState, setCountryState] = useState(Country.NIGERIA);
    const [done, setDone] = useState(null);
    const [showForm, setShowForm] = useState(true)
    const rule = {
        proof_of_address: ["required|Proof of merchant address location is needed(eg nepa bill, tax bill)", "mimes:jpg,jpeg"],
        gov_issued_id: ["required|Your government issued id is required(eg Nin slip,plastic ids)", "mimes:jpg,jpeg"],
        proof_of_merchant: ["required|Picture of you in your market place is required", "mimes:jpg,jpeg"],
        user_photo: ["required|Your passport photograph is required", "mimes:jpg,jpeg"],
        address1: ["required|Your street address is required", "min:10"],
        address2: ["required|Your street address is required", "min:10"],
        city: ["required|Your city or town is required"],
        state: ["required|Your state is required"],
        country: ["required|Your country is required"],
        ssn: ["required|Your nin or ssn is required"],
    }
    const success = (data) => {
        let message = data.message;
        setDone(message);
        setTopError(null)
        let timer = setTimeout(() => {
            setDone(null)
            clearTimeout(timer);
            setApp({ ...app, application: { ...app.application, isMerchantApplied: true } })
            setShowForm(false)
        }, 5000);


    }
    const response_error = (data) => {
        setTopError(data.message ?? "something went wrong")
    }
    const displayError = (data) => {
        setErrors(Utility.parseErrors(data))
    }
    const setCountry = (ev) => {
        let value = ev.target.value.toLowerCase()
        for (let i = 0; i < 3; i++) {
            let country = Country[i].toLowerCase();

            if (country === value) {
                setCountryState(i)
                break
            }
        }
    }
    const StateValue = () => {
        if (countryState === Country.GHANA)
            return Utility.getGhanaStates();
        if (countryState === Country.NIGERIA)
            return Utility.getNigeriaState();
        if (countryState === Country.KENYA)
            return Utility.getKenyaState();

    }
    const submit = () => {
        setErrors(null)
    }


    if (show) {

        if (app.application.isMerchantApplied)
            return <ModalDialog show={true} closeable={true}>
                <div className='flex flex-col items-center justify-center w-3/6 mx-auto h-4/6 shadow shadow-black px-4 my-20 rounded-md'>
                    <span className='mx-4 text-xl font-bold text-center text-green-500'>You have  Applied to become a merchant, so wait for at least 3 to 5 working days! for verification </span>
                    <AiFillCheckCircle fontSize={64} className='text-rose-800' />
                    <span className='font-bold text-xs text-green-600'>Administrator</span>
                </div>
            </ModalDialog>


    }

    return showForm && <Account formType={AccountForms.ChangePassword} submit={submit} showAlt={false} btnText={"Apply"} success={success} error={response_error} formPath={"merchant/become/merchant"} show={show} showError={displayError} rule={rule} heading={"Apply  For Merchant Account"} HeadIcon={AiFillShop} >
        {topError && <span className='flex items-center justify-center font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{topError}</span>}
        {done && <span className='flex items-center justify-center font-sans text-xs font-bold text-green-600'><AiFillCheckCircle fontSize={13} />{done}</span>}
        <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"proof_of_address"} label={"Proof of Address eg. jpg,jpeg"} icon={AiFillFileImage} iconSize={25} type={"file"} />
        <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"gov_issued_id"} label={"Government Issued Identification eg. jpg,jpeg"} icon={AiFillFileImage} iconSize={25} type={"file"} />
        <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"proof_of_merchant"} label={"Proof of Merchant eg. jpg,jpeg"} icon={AiFillFileImage} iconSize={25} type={"file"} />
        <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"user_photo"} label={"User Photo eg. jpg,jpeg"} icon={AiFillFileImage} iconSize={25} type={"file"} />
        <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"address1"} placeholder={"Your Home address "} icon={AiOutlineUser} iconSize={25} type={"text"} />
        <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"address2"} placeholder={"Your Business Address "} icon={AiOutlineUser} iconSize={25} type={"text"} />
        <SelectWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"country"} icon={AiFillCompass} selec iconSize={25} selected={" "} change={setCountry} values={Utility.getCountry()} />
        <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"city"} placeholder={"Business city "} icon={AiOutlineUser} iconSize={25} type={"text"} />
        <SelectWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"state"} icon={AiFillCompass} selec iconSize={25} selected={" "} values={StateValue()} />
        <InputWrapper className={"bg-gray-100 rounded-md my-2 w-5/6"} name={"ssn"} placeholder={"Bussiness ssn"} icon={AiOutlineUser} iconSize={25} type={"text"} />
        <div className='flex flex-col w-4/6 h-auto px-2 mx-auto my-3'>{errors && errors.map((e, i) => <span key={i} className='flex justify-start my-1 font-sans text-xs font-bold text-red-600'><AiFillWarning fontSize={13} />{e}</span>)}</div>
    </Account >
}

export default BeMerchant