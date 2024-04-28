import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const {user, token} = useUser();

    if(!user || !token){
        return <Navigate to="/auth/login" replace />
    }

    return children;
}