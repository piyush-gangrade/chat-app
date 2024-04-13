import React, { createContext, useEffect, useState } from "react";
import {  
    createBrowserRouter,
    RouterProvider 
  } from "react-router-dom";
import { UserContext } from "./Context";
import Home from "./pages/home/Home";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./pages/auth/SignUp";
import { signupAction, loginAction } from "./action";
import LogIn from "./pages/auth/LogIn";
import "./app.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {
        path: "signup",
        action: signupAction,
        element: <SignUp/>
      },
      {
        path: "login",
        action: loginAction,
        element: <LogIn/>
      }
    ]
  }
])


export default function App(){
  const [userData, setUserData] = useState({
    token: "",
    login: false,
    username: ""
  })

  useEffect(()=>{
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const login = localStorage.getItem("login");
    setUserData({
      login: login,
      token: token,
      username: username
    })
  },[])

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}