import React from "react";
import {  
    createBrowserRouter,
    RouterProvider 
  } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthLayout from "./components/AuthLayout";
import SignUp from "./pages/auth/SignUp";
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
        element: <SignUp/>
      },
      {
        path: "login",
        element: <LogIn/>
      }
    ]
  }
]);


export default function App(){
  return (
      <RouterProvider router={router} />
  )
}