import { useContext, useEffect, useState } from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import React from "react";
import SideBar from "../../components/SideBar";
import Contacts from "../../components/Contacts";
import ChatBox from "../../components/ChatBox";
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
        setSelectedUser(e.target.innerText)
    }

    return(
        <div className="home">
            <SideBar />
            <div className="main">
                <Contacts click={user}/>
                <ChatBox selectedUser={selectedUser}/>
            </div>
        </div>
    )
}