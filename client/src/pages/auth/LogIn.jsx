import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import "./auth.css"

export default function LogIn(){
    
    // const actionData = useActionData();
    // const [error, setError] = useState("");

    // useEffect(()=>{
    //     if(actionData){
    //         if(actionData.Error){
    //             setError(actionData.Error);
    //         }
    //         else if(actionData.token && actionData.username){
    //             localStorage.setItem("token", actionData.token);
    //             localStorage.setItem("username", actionData.username);
    //             localStorage.setItem("login", true);
    //             setUserData({
    //                 token: actionData.token,
    //                 login: true,
    //                 username: actionData.username
    //             });
    //         }
    //     }
    // },[actionData])

    
    // if(userData.login){
    // return <Navigate to="/" />
    // }

    return (
        <>
            {/* {error?<div className="error">{error}</div>:""} */}
            <Form className="auth-container" method="post">
                <div className="input-box">
                    <label className="label" htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="input-box">
                    <label className="label" htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="input"
                        required
                    />
                </div>
                <Link className="forget">Forget Password?</Link>
                <button className="submit">Login</button>
                <div className="option">Create a new accout? <Link to="/signup">Sign up</Link></div> 
            </Form>
        </>
    )
}