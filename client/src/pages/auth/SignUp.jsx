import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import "./auth.css"



export default function SignUp(){
//     const { userData, setUserData }  = useContext(UserContext)
//     const [error, setError] = useState("");
//     const actionData = useActionData();

//     useEffect(()=>{
//         if(actionData){
//             if(actionData.Error){
//                 setError(actionData.Error);
//             }
//             else if(actionData.token && actionData.username){
//                 localStorage.setItem("token", actionData.token);
//                 localStorage.setItem("username", actionData.username);
//                 localStorage.setItem("login", true);
//                 setUserData({
//                     token: actionData.token,
//                     login: true,
//                     username: actionData.username
//                 });
//             }
//         }
//     }, [actionData])

// if(userData.login){
//     return <Navigate to="/" />
// }

    return (
        <>
            {/* {error?<div className="error">{error}</div>:""} */}
            <Form className="auth-container" method="post" action="/auth/signup">
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
                <div className="option">Already have an accout? <Link to="/auth/login">Log In</Link></div> 
            </Form>
        </>
    )
}

