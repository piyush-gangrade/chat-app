import { useContext } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import "./home.css";
import  { UserContext }  from "../../Context";

export default function Home() {
    const { userData, setUserData } = useContext(UserContext);
    
    if(!userData.login){
        return <Navigate to="/auth/signup" />
    }

    return(
        <div className="home">
            <Sidebar />
            <Chat />
        </div>
    )
}