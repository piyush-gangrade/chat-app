import React, { useEffect, useState } from "react";
import {  
    createBrowserRouter,
    RouterProvider 
  } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";

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
        // action: signupAction,
        element: <SignUp/>
      },
      {
        path: "login",
        // action: loginAction,
        element: <LogIn/>
      }
    ]
  }
])


export default function App(){
  // const [userData, setUserData] = useState({
  //   token: "",
  //   login: false,
  //   username: ""
  // })

  // useEffect(()=>{
  //   const username = localStorage.getItem("username");
  //   const token = localStorage.getItem("token");
  //   const login = localStorage.getItem("login");
  //   setUserData({
  //     login: login,
  //     token: token,
  //     username: username
  //   })
  // },[])

  return (
      <RouterProvider router={router} />
  )
}