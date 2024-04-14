import { useContext, useEffect, useState } from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import "./home.css";
import  { UserContext }  from "../../Context";

export default function Home() {
    const loaderData = useLoaderData();
    const { userData, setUserData } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState("")
    useEffect(()=>{
        if(loaderData.Error){
            console.error(loaderData.Error)
            setUserData(prev => ({
                ...prev,
                login: false
            }))
        }

    },[loaderData])

    if(!userData.login){
        return <Navigate to="/auth/login" />
    }

    
    const user = (e)=>{
        console.log(e.target)
    }
    return(
        <div className="home">
            <Sidebar click={user}/>
            <Chat />
        </div>
    )
}