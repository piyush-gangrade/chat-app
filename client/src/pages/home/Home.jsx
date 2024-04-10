import { useContext } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import "./home.css";
// import { userContext } from "../../App";

export default function Home() {
    // const {user} = useContext(userContext);
    // if(!user.token){
    //     return <Navigate to="/auth/login" />
    // }
    return(
        <div className="home">
            <Sidebar />
            <Chat />
        </div>
    )
}