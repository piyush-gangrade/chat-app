import React from "react";
import { Form, Link } from "react-router-dom";
import "./auth.css"

export default function LogIn(){
    return (
        <>
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