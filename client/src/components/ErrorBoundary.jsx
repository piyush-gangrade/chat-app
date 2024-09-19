import React, { useEffect, useState } from "react"
import { isRouteErrorResponse, Navigate, useRouteError } from "react-router-dom"
import { useUser } from "../context/UserContext";
import { refershAccessToken } from "../api";
import Loader from "./Loader";

export default function ErrorBoundary() {
    const error = useRouteError();
    const [wait, setWait] = useState(false);
    const [success, setSuccess] = useState(false);
    const {setUser, setToken, user, token, setLoading} = useUser();
    
    console.log("error", error);
    if(isRouteErrorResponse(error)){
        console.log("yesss")
    }

    useEffect(()=>{
        async function checkRefershToken(){
            if((error.response?.status === 401)){
                try{
                    setWait(true);
                    const res = await refershAccessToken();
                    const data = res?.data?.response;
                    console.log(res)
                    if(res.data?.success){
                        localStorage.setItem("token", data?.accessToken);
                        localStorage.setItem("user", data?.userId);
                        setUser(data?.userId);
                        setToken(data?.accessToken);
                        setSuccess(true);
                    }
                    else{
                        throw res.data;
                    }
                }
                catch(err){
                    console.error(err);
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }
                finally{
                    setWait(false)
                }
            }
        }
        checkRefershToken();
    },[])

    if(wait){
        return <Loader />
    }
    
    if(error.response?.status === 401){
        if(success){
            console.log(user, token)
            console.log(wait)
            return <Navigate to="/"/>
        }
    }
    if(!user || !token){
        return <Navigate to="/login"  replace/>
    }

    if(error.response?.status === 500){
        return <>
            <div className="error">
                <h1>500</h1>
                <div className="error-message">Server Unavailable</div>
            </div>
        </>
    }
    else{
        return <>
        <div className="error">
            <h1>404</h1>
            <div className="error-message">Resource Not Found</div>
        </div>
        </>
    }
}