import { AiFillCheckCircle, AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai"
import { SizeBox } from "../components/SizeBox"
import { Socials } from "../components/Socials"
import ProductDisplay from "../components/ProductDisplay"
import { Thumb, watch } from "../../assets"
import { FullProduct } from "../components/FullProduct"
import { HalfProduct } from "../components/HalfProduct"
import { LoginAdv } from "../components/LoginAdv"
import { AppPops } from "../../core/enums/main"
import Login from "../components/Login"
import { useContext } from "react"
import { AppContext } from "../../core/context/AppContext"
import Register from "../components/Register"
import ForgetPassword from "../components/ForgetPassword"
import TopLeftBottomModal from "../components/TopRightBottomModal"
import { TextIcon } from "../components/TextIcon"
import BeMerchant from "../components/BeMerchant"
import { AddFeature } from "../components/AddFeature"


const GuestHome = () => {
    const { app } = useContext(AppContext);


    return (
        <div className="w-5/6 mx-auto">
            <SizeBox height={20} />


            <LoginAdv show={false} />


            {/* <ShowProductAdv image={watch}>
                <List axis={NavigationAxis.Vertical} className="w-3/6 rounded-md hv-20">
                    <h4 className="px-4 py-2 text-3xl font-bold text-center ">10% OFF @ #20000</h4>
                    <Button text="Purchase" className={"w-5/6 mx-auto block rounded-md bg-rose-600 text-white hover:bg-rose-700 transition-all duration-500"} />
                </List>
            </ShowProductAdv> */}

            <TopLeftBottomModal show={app.appPops === AppPops.SHOW_EMAILVERIFIED} className="h-1/6">
                <div className="flex items-center justify-center w-full h-full px-4">
                    <TextIcon text={"Email verified successfully"} Icon={AiFillCheckCircle} iconSize={20} useLink={false} textStyle={"font-monospace font-bold text-sm text-green-500 "} />
                </div>
            </TopLeftBottomModal>





            <Socials children={[
                { icon: AiFillFacebook, link: "#fb", color: "text-blue-800 cursor-pointer hover:blue-blue-600" },
                { icon: AiFillTwitterCircle, link: "#twit", color: "text-sky-800 cursor-pointer hover:text-sky-600" },
                { icon: AiFillInstagram, link: "#insta", color: "text-rose-800 cursor-pointer hover:text-rose-600" },
            ]} />

            <div className="w-full bg-white rounded-md hv-50">
                <ProductDisplay headingStyle="px-4 font-bold font-sans text-2xl" heading={"Super Deals"}>
                    {[
                        { pname: "watch dog 33.em", vendorImage: Thumb, "orders": 4, price: "30000", currency: "#", old_price: "32", rate: 2, vendor: "prois", tag: "new", image: watch },
                        { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "50000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "trend", image: watch },
                        { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "90000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "popular", image: watch },
                        { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "10000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "hot", image: watch },

                    ].map((e, i) => <FullProduct name={e.pname} vendorImage={e.vendorImage} image={e.image} key={i} vendor={e.vendor} old_price={e.old_price} order_count={e.orders} price={e.price} rating={e.rate} tag={e.tag} currency={e.currency} />)

                    }
                </ProductDisplay>


            </div>

            <div className="w-full my-4 bg-white rounded-md hv-30">

                <ProductDisplay headingStyle="px-4 font-bold font-sans text-2xl" heading={"Hot deals"}>
                    {[
                        { pname: "watch dog 33.em", vendorImage: Thumb, "orders": 4, price: "30000", currency: "#", old_price: "32", rate: 2, vendor: "prois", tag: "new", image: watch },
                        { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "50000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "trend", image: watch },
                        { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "90000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "popular", image: watch },
                        { pname: "watch dog 13.em", "orders": 34, vendorImage: Thumb, price: "10000", currency: "#", old_price: "332", rate: 4, vendor: "prwis", tag: "hot", image: watch },

                    ].map((e, i) => <HalfProduct image={e.image} key={i} old_price={e.old_price} discount={e.discount} order_count={e.orders} price={e.price} rating={e.rate} tag={e.tag} currency={e.currency} />)

                    }
                </ProductDisplay>


            </div>
            <SizeBox height={10} />

            <Login show={app.appPops === AppPops.LOGIN} />
            <Register show={app.appPops === AppPops.REGISTER} />
            <ForgetPassword show={app.appPops === AppPops.FORGETPASSWORD} />
            <BeMerchant show={app.appPops === AppPops.BEMERCHANT} />
            <AddFeature show={app.appPops === AppPops.ADD_FEATURE} />

        </div>
    )
}

export default GuestHome