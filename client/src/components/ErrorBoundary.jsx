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
    
    // console.log("error", error);
    useEffect(()=>{
        async function checkRefershToken(){
            if(error.status === 401){
                try{
                    setWait(true);
                    const res = await refershAccessToken();
                    const data = res?.data?.response;
                    console.log(data);
                    localStorage.setItem("token", data?.accessToken);
                    localStorage.setItem("user", data?.userId);
                    setUser(data?.userId);
                    setToken(data?.accessToken);
                    setSuccess(true);
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
    
    if(error.status === 401){
        if(success){
            console.log(user, token)
            console.log(wait)
            return <Navigate to="/"/>
        }
    }
    if(!user || !token){
        return <Navigate to="/login"  replace/>
    }
console.log(error)
    return <>
    <div>
    error
    </div>
    </>
    
}