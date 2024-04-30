import React from "react";

export default function AuthLayout({children}){
    return (
    <div className="auth-section">
        <h1 className="heading">Welcome to Chatters..!</h1>
        {children}
    </div>
    )
}