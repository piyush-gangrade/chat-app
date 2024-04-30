import React, { useEffect, useState } from "react";
import {  
    createBrowserRouter,
    RouterProvider 
  } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import { signupAction } from "./action";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Chat />
      </PrivateRoute>
    )
  },
  {
    path: "/login",
    // action: loginAction,
    element: (
      <AuthLayout>
        <LogIn />
      </AuthLayout>
    )
  },
  {
    path: "/signup",
    action: signupAction,
    element: (
      <AuthLayout>
        <SignUp/>
      </AuthLayout>
    )
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