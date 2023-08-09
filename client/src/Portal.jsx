import { Routes, Route } from "react-router-dom";
import { AccessType, RequestMethod } from "./core/enums/main";
import useApi from "./useApi";
import GuestLayout from "./layout/GuestLayout";
import { authenticated_routes, guest_routes } from "./core/routes";
import HomeBelow from "./sections/homes/HomeBelow";
import { useContext, useState } from "react";
import { Utility } from "./Utility";
import { AppContext } from "./core/context/AppContext";


export const GuestPorter = () => {
    return <>
        <GuestLayout>
            <Routes>
                {guest_routes.map((e, i) => <Route key={i} exact={true} path={e.path} Component={e.component} />)}
            </Routes>
            <HomeBelow />
        </GuestLayout>

    </>
}
export const AuthenticatedPorter = (props) => {
    return <GuestLayout>
        <Routes>
            {authenticated_routes.map((e, i) => <Route key={i} exact={true} path={e.path} Component={e.component} />)}
        </Routes>
        <HomeBelow />
    </GuestLayout>

}
export const MerchantPorter = (props) => {
    return <>Merchant</>
}

export const AdminPorter = (props) => {
    return <>Admin</>
}

export const MasterPorter = (props) => {
    return <>Master</>
}


export const Portal = () => {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const { app, setApp } = useContext(AppContext);



    // eslint-disable-next-line no-unused-vars
    useApi(true, "auth", RequestMethod.GET, {}, data => {
        setData(data);
        console.log(data)
    }, (err) => {
        setError(err);
    });





    const evalPortal = (role, data) => {
        role = `${role}`.toLowerCase();
        if (app.access !== Utility.accessNamesToEnum(role)) {
            setApp({ ...app, access: Utility.accessNamesToEnum(role) })
            if (role !== "guest") {
                if (!app.profile.id) {
                    Utility.login({ app: app, setApp: setApp }, data)
                }
            } else {
                Utility.logout();
            }
        }
        if (role === "guest") return <GuestPorter />
        else if (role === "authenticated" || app.access === AccessType.Authenticated) return <AuthenticatedPorter {...data} />
        else if (role === "admin" || app.access === AccessType.Admin) return <AdminPorter {...data} />
        else if (role === "merchant" || app.access === AccessType.Merchant) return <MerchantPorter {...data} />
        else if (role === "master" || app.access === AccessType.Master) return <MasterPorter {...data} />

    }

    if (error)
        return <GuestPorter />


    return data && evalPortal(data.role, data)
}