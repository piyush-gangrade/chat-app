import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import "./auth.css"
import Loader from "../../components/Loader";
import { useUser } from "../../context/UserContext";

export default function LogIn(){
    
    const actionData = useActionData();
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const {setLoading} = useUser();

    useEffect(()=>{
        if(actionData){
            setLoading(false)
            actionData.error ? setError(true): setError(false);
            setResponse(actionData.error);
        }
    },[actionData])

    
    // if(userData.login){
    // return <Navigate to="/" />
    // }
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