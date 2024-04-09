import {createContext, useEffect, useState} from "react";
import {  
    createBrowserRouter,
    RouterProvider 
  } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import LogIn from "./pages/auth/LogIn.jsx";
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
        element: <LogIn/>,
      }
    ]
  }
]);


export const userContext = createContext();

export default function App(){
  const [userData, setUserData] = useState({
    token: "",
    user: {}
  });

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if(user && token){
      setUserData({
        token: token,
        user: user
      })
    }
  },[])

  return (
    <userContext.Provider value={{userData, setUserData}}>
      <RouterProvider router={router} />
    </userContext.Provider>
  )
}
