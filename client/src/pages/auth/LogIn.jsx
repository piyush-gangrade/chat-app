import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import { UserContext } from "../../Context";
import "./auth.css"

export default function LogIn(){
    const {userData, setUserData} = useContext(UserContext);
    const actionData = useActionData();
    const [error, setError] = useState("");

    useEffect(()=>{
        if(actionData){
            if(actionData.Error){
                setError(actionData.Error);
            }
            else if(actionData.token && actionData.username){
                localStorage.setItem("token", actionData.token);
                localStorage.setItem("username", actionData.username);
                localStorage.setItem("login", true);
                setUserData({
                    token: actionData.token,
                    login: true,
                    username: actionData.username
                });
            }
        }
    },[actionData])

    
    if(userData.login){
    return <Navigate to="/" />
    }

    return (
        <>
            {error?<div className="error">{error}</div>:""}
            <Form className="container" method="post">
                <div>
                    <label className="label" htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                    />
                </div>
                <div>
                    <label className="label" htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="input"
                    />
                </div>
                <button className="submit">Login</button>
                <div className="sign-option">Create a new accout? <Link to="/auth/signup">Sign up</Link></div> 
            </Form>
        </>
    )
}