import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ProcessType, RequestMethod } from './core/enums/main';
import { AppContext } from './core/context/AppContext';

const options = (app, setApp) => {
    return {
        onDownloadProgress: (event) => {
            //            let progress = document.querySelector(".progress-light");
        },
        onUploadProgress: (event) => {
            let percent = Math.floor(event.progress * 100);
            //let MbSize = (event.loaded / 1000000).toFixed(3)
            if (app)
                setApp({ ...app, progressPecent: percent })
        }
    }
}
export const Config = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.post.Accept = "form-data/multipart"
    axios.interceptors.request.use((config) => {
        try {
            let token = JSON.parse(localStorage.getItem("user")).token;
            config.headers.Authorization = "Authorization:Bearer " + token;
        } catch (e) {

        }
        return config;
    });

}

const useApi = (enable, pathUrl, method, formData, onSuccess = (data) => { }, onError = (data) => { }) => {
    const [started, setStarted] = useState(false);
    const { app, setApp } = useContext(AppContext)
    const [data, setData] = useState(null)
    const [err, setErr] = useState(null)



    useEffect(() => {
        if (enable && !started) {
            const path = `${window.host}api/v2/${pathUrl}`;
            let request = null;
            setStarted(true)
            setApp({ ...app, process: ProcessType.Loading });

            switch (method) {
                case RequestMethod.POST:
                    request = axios.post(path, formData, options(app, setApp));
                    break;
                case RequestMethod.GET:
                    request = axios.get(path, options(app, setApp));
                    break;
                case RequestMethod.DELETE:
                    request = axios.delete(path, options(app, setApp));
                    break;
                case RequestMethod.PUT:
                    request = axios.put(path, options(app, setApp));
                    break;
                default:
                    request = axios.get(path, options(app, setApp));
                    break;
            }

            request.then(response => {
                setStarted(false);
                setApp({ ...app, process: ProcessType.None });
                setData(response.data);
                if (onSuccess) onSuccess(response.data)
            }).catch(err => {
                setStarted(false);
                try {
                    setErr({ ...err.response.data, status: err.response.status })
                    if (onError) onError({ ...err.response.data, status: err.response.status })
                    setApp({ ...app, process: ProcessType.None });

                } catch (e) {
                    setErr({ message: "connection failed", status: 400 });
                    if (onError) onError({ message: "connection failed", status: 400 })
                    setApp({ ...app, process: ProcessType.None });


                }
            });

        }
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [enable]);



    return { data: data, err: err }

}

export default useApi