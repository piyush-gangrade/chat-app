import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function EmailVerification() {
    const [response, setResponse] = useState(null);
    const loaderData = useLoaderData();

    useEffect(()=>{
        setResponse(loaderData);
    },[loaderData])

    return (
        <div>
            <h1>{response}</h1>
        </div>
    )
}