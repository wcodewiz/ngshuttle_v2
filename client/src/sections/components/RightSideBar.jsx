import React, { useContext } from 'react'
import { SizeBox } from './SizeBox'
import { Thumb, watch } from '../../assets'
import MovingDisplay from './MovingDisplay'
import { GuestAccount } from './GuestAccount'
import { List } from './List'
import { Button } from './Button'
import { AppContext } from '../../core/context/AppContext'
import { AppPops, NavigationAxis } from '../../core/enums/main'
import { Navigation } from './Navigation'
import { AiFillDelete, AiFillFileAdd, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { HalfProductPriceOnly } from './HalfProductPriceOnly'
import { NavigationItem } from './NavigationItem'
import { Link } from 'react-router-dom'

export const RightSideBar = () => {
    const { app, setApp } = useContext(AppContext);
    return (
        <div style={{ width: '130%' }}>
            <SizeBox height={20} />
            <div className='relative w-full px-1 py-2 bg-white rounded-md hv-80 -left-20'>
                <div className='hv-10'>
                    <MovingDisplay className='w-full h-full pb-5' headingStyle="px-4 font-bold font-sans text-2xl" heading={"New Arrivals"}>
                        {[
                            { pname: "watch dog 33.em", vendorImage: Thumb, "orders": 4, price: "30000", currency: "#", old_price: "32", rate: 2, vendor: "prois", tag: "new", image: watch },
                            { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "50000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "trend", image: watch },
                            { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "90000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "popular", image: watch },
                            { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "10000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "hot", image: watch },

                        ].map((e, i) => <HalfProductPriceOnly image={e.image} key={i} old_price={e.old_price} price={e.price} currency={e.currency} />)

                        }
                    </MovingDisplay>
                </div>

                <SizeBox height={25} />

                <div className='bg-transparent hv-5'>
                    {!app.profile.id && <GuestAccount >
                        <List>
                            <Button className={"bg-green-700 text-white rounded-md border-none hover:bg-green-500 transition-all duration-300"} onClick={() => setApp({ ...app, appPops: AppPops.REGISTER })} text={"Register"} />
                            <Button className={"bg-rose-700 text-white rounded-md border-none hover:bg-rose-500 transition-all duration-300"} onClick={() => setApp({ ...app, appPops: AppPops.LOGIN })} text={"Login"} />
                        </List>
                    </GuestAccount>}
                    {
                        app.profile.id && <div className='bg-rose-200 px-4 py-2 rounded-full shadow-md mt-10 w-full'>
                            <Navigation axis={NavigationAxis.Horizontal}>
                                <AiFillFileAdd onClick={() => setApp({ ...app, appPops: AppPops.ADD_FEATURE })} fontSize={30} className='cursor-pointer bg-white px-1 rounded-md text-green-700' />
                                <NavigationItem Icon={AiOutlineMenu} title={"Admin List"} items={0} link='#menulist' width={100} height={50}>
                                    <List axis={NavigationAxis.Vertical}>
                                        <Link to={"#toProducts"}>All Products</Link>
                                        <Link to={"#toCategory"}>Categories</Link>
                                        <Link to={"#toProducts"}>Vendors</Link>
                                        <Link to={"#toProducts"}>Applied Merchant</Link>
                                    </List>
                                </NavigationItem>
                                <AiOutlineUser fontSize={30} className='cursor-pointer bg-white px-1 rounded-md text-green-700' />
                                <AiFillDelete fontSize={30} className='cursor-pointer bg-white px-1 rounded-md text-green-700' />
                            </Navigation></div>
                    }
                </div>
                <SizeBox height={5} />

                <div className='h-2/6 my-4 flex justify-center'>
                    {<HalfProductPriceOnly image={watch} old_price={3000} price={5000} currency={"$"} />}
                </div>


            </div>
        </div>
    )
}
