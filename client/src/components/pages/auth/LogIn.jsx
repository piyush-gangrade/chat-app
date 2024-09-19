import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import "./auth.css";
import { useUser } from "../../../context/UserContext";
export default function LogIn(){
    
    const actionData = useActionData();
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(null);
    const {user, setUser, token, setToken} = useUser();
    
    useEffect(()=>{
        if(actionData){
            console.log(actionData)
            if(actionData.success){
                localStorage.setItem("token", actionData.response.accessToken);
                localStorage.setItem("user", actionData.response.userId);
                setUser(actionData.response.userId);
                setToken(actionData.response.accessToken);
            }
            else{
                setError(true);
                setResponse(actionData.response)
            }  
        }
    },[actionData])
    // console.log(user, token)
    if(user && token){
        return <Navigate to="/" replace/>;
    }
    
    const errorStyle = {
        color: error? "#FF0000": "#00ff00"
    }

    return (
        <>
        <div className="auth-section">
            <h1 className="heading">Welcome to Chatters..!</h1>
            <div className="response" style={errorStyle}> {error?response:""} </div>

            <Form className="auth-container" method="post" action="/login">
                <div className="input-box">
                    {/* <label className="label" htmlFor="username">Username: </label> */}
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        autoComplete="off"
                        placeholder="Username:"
                        required
                    />
                </div>
                <div className="input-box">
                    {/* <label className="label" htmlFor="password">Password: </label> */}
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="input"
                        placeholder="Password:"
                        required
                    />
                </div>
                <Link className="forget">Forget Password?</Link>
                <button className="submit">Login</button>
                <div className="option">Create a new accout? <Link to="/signup">Sign up</Link></div> 
            </Form>
        </div>
    
        </>
    )
}