import React, { useEffect, useState } from "react";
import {  
    createBrowserRouter,
    redirect,
    RouterProvider 
  } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import { signupAction, loginAction } from "./action";
import { useUser } from "./context/UserContext";
import EmailVerification from "./pages/auth/EmailVerification";
import { checkLoginLoader, emailVerifyLoader } from "./loader";
import ChatBox from "./components/ChatBox";

const router = createBrowserRouter([
  {
    path: "/",
    //check user is logged in or not
    loader: (()=>{
      const login = checkLoginLoader();
      if(!login){
        return redirect("/login");
      }
      return null;
    }),
    element: <Chat />,
    children: [
      {
        path: ":chatId",
        element: (
            <ChatBox />
        )
      }
    ]
  },
  {
    path: "/login",
    //check user is logged in or not
    loader: (()=>{
      const login = checkLoginLoader();
      if(login){
        return redirect("/");
      }
      return null;
    }),
    action: loginAction,
    element: (
      <AuthLayout>
        <LogIn />
      </AuthLayout>
    )
  },
  {
    path: "/signup",
    action: signupAction,
    //check user is logged in or not
    loader: (()=>{
      const login = checkLoginLoader();
      if(login){
        return redirect("/");
      }
      return null;
    }),
    element: (
      <AuthLayout>
        <SignUp/>
      </AuthLayout>
    )
  },
  {
    path: "/auth/:userId/:token",
    loader: emailVerifyLoader,
    element: <EmailVerification />
  }
])


export default function App(){
  const { setLoading } = useUser();
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
    <>
      <RouterProvider router={router} setLoading={setLoading} />
    </>
  )
}