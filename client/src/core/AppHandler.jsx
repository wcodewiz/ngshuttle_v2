/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react"
import { AppContext } from "./context/AppContext"
import { AppState } from "./AppState";
import { AppPops, RequestMethod } from "./enums/main";
import useApi from "../useApi";

export const AppHandler = () => {
    const { app, setApp } = useContext(AppContext);
    const { sendEmailVerify, setSendEmailVerify } = useState(false)

    useApi(sendEmailVerify, `account/send/email/${app?.profile?.id ?? null}`, RequestMethod.DELETE, {}, () => { sendEmailVerify(false) })



    switch (app.appState) {
        case AppState.POPUP_LOGIN_MODAL:
            setApp({ ...app, appPops: AppPops.LOGIN });
            break;
        case AppState.POPUP_REGISTER_MODAL:
            setApp({ ...app, appPops: AppPops.REGISTER });
            break;
        case AppState.POPUP_NO_MODAL:
            setApp({ ...app, appPops: AppPops.NONE });
            break;
        case AppState.Send_Mail_TO_USER:
            setSendEmailVerify(true)
            setApp({ ...app, appPops: AppPops.NONE });
            break;
        default: return app;
    }

}