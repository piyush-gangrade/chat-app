import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute(){
    const {user, token} = useUser();

    if(!user || !token){
        return <Navigate to="/login" replace />
    }

    return <Outlet />;
}