import React from "react";
import {  
    createBrowserRouter,
    RouterProvider 
  } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthLayout from "./components/AuthLayout";
import SignIn from "./pages/auth/SignIn";
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
        path: "signin",
        element: <SignIn/>
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