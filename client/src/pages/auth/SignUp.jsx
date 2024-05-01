import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import "./auth.css"
import { useUser } from "../../context/UserContext";


export default function SignUp(){
    const { setLoading } = useUser();
    const actionData = useActionData();
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(null)

    useEffect(()=>{
        if(actionData){
            setLoading(false)
            console.log(actionData.stauts)
            actionData.stauts !== 200? setError(true): setError(false);
            setResponse(actionData.response);
        }
    }, [actionData])

// if(userData.login){
//     return <Navigate to="/" />
// }
    const errorStyle = {
        color: error? "#FF0000": "#00ff00"
    }

    return (
        <>
            <div className="response" style={errorStyle}> {response?response:""} </div>
            <Form onSubmit={()=>setLoading(true)} className="auth-container" method="post" action="/signup">
                <div className="input-box">
                    <label className="label" htmlFor="username">Enter username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                        required
                    />
                </div>
                <div className="input-box">
                    <label className="label" htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
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
                <div className="input-box">
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
                <div className="option">Already have an accout? <Link to="/login">Log In</Link></div> 
            </Form>
        </>
    )
}
