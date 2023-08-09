import { useContext, useState } from 'react'
import Picture from '../../core/lib/utils/Picture'
import { Thumb, banner, watch } from '../../assets'
import { AiOutlineUser, AiFillAlert, AiFillSetting, AiOutlineLogin, AiOutlineShoppingCart, AiFillFlag, AiFillShop, AiFillBook, AiFillClockCircle } from "react-icons/ai"
import { Navigation } from './Navigation'
import { AccessType, AppPops, NavigationAxis, RequestMethod } from '../../core/enums/main'
import { NavigationItem } from './NavigationItem'
import { AppContext } from '../../core/context/AppContext'
import { NavigationItemText } from './NavigationItemText'
import ListTile from './ListTile'
import { SearchWrapper } from '../forms/SearchWrapper'
import { TextIcon } from './TextIcon'
import ListIcon from './ListIcon'
import { Banner } from './Banner'
import { Link } from 'react-router-dom'
import useApi from '../../useApi'


export const Header = () => {
    const { app, setApp } = useContext(AppContext);
    const [resendMail, setResendMail] = useState(false);
    useApi(resendMail, `account/send/email/${app?.profile?.id ?? null}`, RequestMethod.DELETE, {})

    const sendEmail = (ev) => {
        setResendMail(true);
        ev.target.innerHTML = "email sent";
    }


    return (
        <div className='fixed top-0 left-0 z-10 w-full bg-gray-100'>
            {(app.profile.id && !app.profile.mail_verified) && <span className='flex justify-start w-full px-4 font-bold bg-rose-400 text-rose-900'>Email not Verified <Link className="px-4 py-0 mx-4 my-1 text-xs text-green-700 transition-all duration-300 bg-green-300 rounded-full hover:bg-green-400" to="#resend" onClick={sendEmail}>Resend Mail</Link></span>}
            <Banner image={banner} closeable={true} />
            <div className='flex justify-between w-full px-4 py-2 bg-gray-100 hv-10'>
                <div className='flex items-center justify-center w-1/6 px-2 mx-4'>
                    <Picture src={Thumb} className={"px-1 w-4/6 h-auto object-cover object-center"} width={100} height={64} />

                </div>
                <Navigation axis={NavigationAxis.Horizontal}>
                    {app.access !== AccessType.Guest ?
                        <NavigationItem Icon={AiOutlineUser} items={1} width={60} >
                            <h3 className='px-4 py-2 pb-5 font-bold text-gray-700'>Profile</h3>
                            <NavigationItemText text={"Profile"} link={"#profile"} items={0} />
                            <NavigationItemText text={"Edit Profile"} link={"#editprofile"} items={0} />
                            <NavigationItemText click={() => setApp({ ...app, appPops: AppPops.BEMERCHANT })} text={"Become a Merchant"} link={"#merchant"} items={0} />
                            <NavigationItemText text={"Become a publisher"} link={"#publisher"} items={0} />
                            <NavigationItemText text={"Become an Advertiser"} link={"#merchant"} items={0} />
                            <NavigationItemText text={"File an Appeal"} link={"#merchant"} items={0} />
                            <NavigationItemText text={"Wallet"} link={"#merchant"} items={0} />
                            <NavigationItemText text={"Review"} link={"#review"} items={0} />
                        </NavigationItem>
                        :
                        <NavigationItem title="login" height={40} width={60} Icon={AiOutlineLogin} items={0}>
                            <Navigation axis={NavigationAxis.Vertical} >
                                <NavigationItemText text={"Create Account"} click={() => setApp({ ...app, appPops: AppPops.REGISTER })} link={"#create_account"} items={0} />
                                <NavigationItemText text={"Login"} click={() => setApp({ ...app, appPops: AppPops.LOGIN })} link={"#login"} items={0} />
                                <NavigationItemText text={"Help Center"} link="#helpcenter" className='mx-4 mt-12 text-sm font-bold text-black' items={0} />
                                <NavigationItemText text={"Privacy Policy"} link="#helpcenter" className='mx-4 my-1 text-sm font-bold text-black' items={0} />
                                <NavigationItemText text={"Terms and Conditions"} link="#helpcenter" className='mx-4 my-2 text-sm font-bold text-black ' items={0} />
                            </Navigation>
                        </NavigationItem>
                    }
                    <NavigationItem moveLeft={30} width={60} height={50} Icon={AiFillAlert} title={"notifications"} items={45}>
                        <Navigation axis={NavigationAxis.Vertical}>
                            <ListTile leadingSrc={watch} title={"Your Order has been confirmed"} Trailing={AiOutlineLogin} maxTitleLine={20} subtile={"Nghomes"} />
                            <ListTile leadingSrc={watch} title={"Your Order has been confirmed"} Trailing={AiOutlineLogin} maxTitleLine={20} subtile={"Nghomes"} />
                            <ListTile leadingSrc={watch} title={"Your Order has been confirmed"} Trailing={AiOutlineLogin} maxTitleLine={20} subtile={"Nghomes"} />
                            <ListTile leadingSrc={watch} title={"Your Order has been confirmed"} Trailing={AiOutlineLogin} maxTitleLine={20} subtile={"Nghomes"} />

                        </Navigation>

                    </NavigationItem>
                    <NavigationItem moveLeft={60} width={80} Icon={AiOutlineShoppingCart} title={"cart"} items={4} >
                        <ListIcon leadingSrc={watch} className='relative'>
                            <div className='flex justify-between'>
                                <TextIcon textStyle='w-5/6 overflow-hidden px-0 text-xs whitespace-nowrap text-ellipsis' className='' text={"Watch 4.4 mm 3 meteres"} />
                                <TextIcon textStyle={"whitespace-nowrap -mx-10 text-xs"} text={"$ 5.6"} />
                            </div>
                            <div className='absolute top-0 right-0'>
                                <TextIcon text={"2h"} textStyle={"whitespace-nowrap text-sm mx-0 px-0"} className='justify-center ' iconSize={10} Icon={AiFillClockCircle} />
                            </div>
                        </ListIcon>



                    </NavigationItem>
                    <NavigationItem moveLeft={80} width={50} Icon={AiFillSetting} title={"settings"} animate={true} items={0}>
                        {["Profile Settings", "General Settings", "Wallet Setting", "Vendor Settings"
                            , "Purchase Ncredit", "Become Advertiser"
                            , "Appearance", "Become a Publisher", "Report A Vendor"
                            , "File Appeal", "Logout"].map((e, i) => <TextIcon key={i} Icon={AiFillSetting} iconSize={12} text={e} />)}

                    </NavigationItem>
                </Navigation>

                <div className='flex justify-between w-4/6 px-4'>
                    <div className='w-5/6'>
                        <SearchWrapper />
                    </div>
                    <Navigation axis={NavigationAxis.Horizontal}>
                        <NavigationItem moveLeft={0} height={30} width={80} Icon={AiFillFlag} title={"Change Language"} items={0}>
                            {["English", "Espanol", "Korea", "Chinese", "Japanese", "Arabic"].map((e, i) => <TextIcon key={i} Icon={AiFillBook} iconSize={12} text={e} />)}
                        </NavigationItem>
                        <NavigationItem moveLeft={30} width={80} height={30} Icon={AiFillShop} title={"Merchant"} items={0} >
                            {["Apply", "View Profile", "Setting", "Trash", "All Vendors", "Orders"].map((e, i) =>
                                <TextIcon key={i} Icon={AiFillShop} iconSize={12} text={e} />)}

                        </NavigationItem>
                    </Navigation>

                </div>


            </div>
        </div>
    )
}
