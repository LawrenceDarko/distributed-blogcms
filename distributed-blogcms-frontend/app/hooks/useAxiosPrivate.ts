'use client'

import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAxiosPrivate = () => {
    const router = useRouter()
    
    useEffect(() => {
        const authToken = localStorage?.getItem('token')
        // console.log(authToken)
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                config.withCredentials = true;
                if (authToken) {
                    config.headers['Authorization'] = `Bearer ${authToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                if (error) {
                    // console.log("Redirect URL:", error.response.data.data.redirectUrl);
                    // return router.push(error.response.data.data.redirectUrl)
                    console.log("ERROR: ", error)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [])

    return axiosPrivate;
}

export default useAxiosPrivate;