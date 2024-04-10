import React from "react";
import { Form, Link } from "react-router-dom";
import "./auth.css"
export default function SignUp(){
    return (
        <>
            <Form className="container">
                <div>
                    <label className="label" htmlFor="username">Enter a Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input"
                    />
                </div>
                <div>
                    <label className="label" htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
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
                <div>
                    <label className="label" htmlFor="confirm-password">Confirm Password: </label>
                    <input 
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className="input"
                    />
                </div>
                <button className="submit">SignIn</button>
                <div className="sign-option">Already have an accout? <Link to="/auth/login">Log In</Link></div> 
            </Form>
        </>
    )
}