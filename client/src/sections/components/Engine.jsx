
import React, { useEffect, useContext } from 'react'
import { AppContext } from '../../core/context/AppContext'
import { AccessType, GeneralAdv } from '../../core/enums/main'

let start = false
export const Engine = ({ loopMilisec = 7000 }) => {
    let { app } = useContext(AppContext)

    const randomAction = () => {
        start = false;
        let selected, len;
        if (app.access === AccessType.Guest) {
            let selections = [GeneralAdv.CREATE_AN_ACOOUNT, GeneralAdv.DOWNLOAD_APP, GeneralAdv.EARN_MONEY, GeneralAdv.SELL_BREEZE, GeneralAdv.SHOW_DEAL, GeneralAdv.SHOW_PRODUCT];
            len = selections.length - 1;
            selected = (Math.random() * len).toFixed(0)
        } else
            if (app.access === AccessType.Authenticated) {
                let selections = [GeneralAdv.DOWNLOAD_APP, GeneralAdv.BECOME_A_MERCHANT
                    , GeneralAdv.EARN_MONEY, GeneralAdv.SHOW_DEAL, GeneralAdv.SHOW_PRODUCT];
                len = selections.length - 1;
                selected = (Math.random() * len).toFixed(0)
            } else
                if (app.access === AccessType.Merchant) {
                    let selections = [GeneralAdv.DOWNLOAD_APP, GeneralAdv.SELL_BREEZE,
                    GeneralAdv.EARN_MONEY, GeneralAdv.SELL_BREEZE,
                    GeneralAdv.SHOW_DEAL, GeneralAdv.SHOW_PRODUCT];
                    len = selections.length - 1;
                    selected = (Math.random() * len).toFixed(0)
                }
                else
                    if (app.access === AccessType.Admin || app.access === AccessType.Master) {
                        selected = GeneralAdv.None;
                    }
        let advChrome = document.querySelectorAll("#adv-chrome");
        advChrome.forEach((e) => {
            e.setAttribute("data-advToken", selected);
        });

    }


    useEffect(() => {
        if (!start) {
            start = true;

            setInterval(() => randomAction(), loopMilisec)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return <></>
}
