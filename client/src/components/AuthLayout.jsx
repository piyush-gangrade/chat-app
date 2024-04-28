import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return (
    <div className="auth-section">
        <h1 className="heading">Welcome to Chatters..!</h1>
        <Outlet/>
    </div>
    )
}