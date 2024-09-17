import React, { useEffect, useState } from "react";
import {  
    createBrowserRouter,
    RouterProvider 
  } from "react-router-dom";
import Chat from "./components/pages/chat/Chat";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./components/pages/auth/SignUp";
import LogIn from "./components/pages/auth/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import { signupAction, loginAction, chatAction } from "./action";
import EmailVerification from "./components/pages/auth/EmailVerification";
import { chatLoader, emailVerifyLoader, homeLoader } from "./loader";
import ChatBox from "./components/ChatBox";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    loader: homeLoader,
    errorElement: <ErrorBoundary />,
    element: 
      <PrivateRoute>
        <Chat />
      </PrivateRoute>
    ,
    children: [
      {
        loader: chatLoader,
        action: chatAction,
        path: ":chatId",
        element: (
            <ChatBox />
        )
      }
    ]
  },
  {
    path: "/login",
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}