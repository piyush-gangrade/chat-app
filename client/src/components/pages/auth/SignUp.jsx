import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import "./auth.css"
import { useUser } from "../../../context/UserContext";


export default function SignUp(){
    const { setLoading } = useUser();
    const actionData = useActionData();
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(null);
    const {user, token, setUser, setToken} = useUser();
    
    useEffect(()=>{
        if(actionData){
            setLoading(false)
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
    }, [actionData])

    const errorStyle = {
        color: error? "#FF0000": "#00ff00"
    }

    if(user && token){
        return <Navigate to="/" replace/>
    }

    return (
        <>
        <div className="auth-section">
            <h1 className="heading">Welcome to Chatters..!</h1>
            <div className="response" style={errorStyle}> {response?response:""} </div>
            <Form onSubmit={()=>setLoading(true)} className="auth-container" method="post" action="/signup">
                <div className="input-box">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        placeholder="Username:"
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
                        placeholder="Email:"
                        required
                    />
                </div>
                <div className="input-box">
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="input"
                        placeholder="Password: "
                        required
                    />
                </div>
                <div className="input-box">
                    <input 
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className="input"
                        placeholder="Confirm Password: "
                        required
                    />
                </div>
                <button className="submit">SignIn</button>
                <div className="option">Already have an accout? <Link to="/login">Log In</Link></div> 
            </Form>
        </div>
        </>
    )
}
