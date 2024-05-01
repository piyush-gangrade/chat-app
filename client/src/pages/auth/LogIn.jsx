import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import "./auth.css";
import { useUser } from "../../context/UserContext";
export default function LogIn(){
    
    const actionData = useActionData();
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(null);
    const {setLoading} = useUser();
    const {user, setUser, token, setToken} = useUser();

    
    useEffect(()=>{
        if(actionData){
            setLoading(false)
            if(actionData.error){
                setError(true);
                setResponse(actionData.error);
            }
            else{
                localStorage.setItem("token", actionData.token);
                localStorage.setItem("user", actionData.userId);
                setUser(actionData.userId);
                setToken(actionData.token);
            }       
        }
    },[actionData])
    
    const errorStyle = {
        color: error? "#FF0000": "#00ff00"
    }

    return (
        <>
            <div className="response" style={errorStyle}> {response?response:""} </div>
            <Form className="auth-container" onSubmit={()=>{setLoading(true)}} method="post" action="/login">
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