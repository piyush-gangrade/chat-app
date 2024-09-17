import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";

export default function EmailVerification() {
    const [response, setResponse] = useState(null);
    const loaderData = useLoaderData();
    const param = useParams();

    console.log(param.userId)
    useEffect(()=>{
        loaderData.status !== 200? setIsError(true):setIsError(false);
        setResponse(loaderData.response);
    },[loaderData])

    return (
        <div className="auth-section verify-email">
            <h1>{response}</h1>
            <Link to="/login" className="option">Back to Login</Link>
        </div>
    )
}