import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import "./auth.css"
import  userContext  from "../../App";
import axios from "axios";

export default function SignUp(){
    const { userData, setUserData } = useContext(userContext)
    const [error, setError] = useState("");
    const actionData = useActionData();

    useEffect(()=>{
        if(actionData){
            if(actionData.Error){
                setError(actionData.Error);
            }
            if(actionData.token && actionData.username){
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
    }, [actionData])

if(userData.login){
    return <Navigate to="/" />
}

    return (
        <>
            {error?<div className="error">{error}</div>:""}
            <Form className="container" method="post" action="/auth/signup">
                <div>
                    <label className="label" htmlFor="username">Enter a Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="label" htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="label" htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label className="label" htmlFor="confirm-password">Confirm Password: </label>
                    <input 
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className="input"
                        required
                    />
                </div>
                <button className="submit">SignIn</button>
                <div className="sign-option">Already have an accout? <Link to="/auth/login">Log In</Link></div> 
            </Form>
        </>
    )
}

export const signupAction = async ({request}) => {
    const formData = await request.formData();

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if(password !== confirmPassword){
        return {Error: "Confirm Password is not same"}
    }

    try{
        const res = await axios.post("http://localhost:8800/auth/signup", {
            username,
            email,
            password
        })
        const data = {
            token: res.data.token,
            username: res.data.user.username
        }
        return data;
    }
    catch(err){
        return {Error:`${err.response.data.Error}`}
    }
}