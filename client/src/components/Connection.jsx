import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ({chatId, username}) {
    const navigate = useNavigate();
    const handleClick = (e)=>{
        const chatId = e.target.id;
        const username = e.target.name;

        navigate(`${chatId}`, {state: {username}})
    }
    return (
        <>
            <button id={chatId} name={username} className="contact" onClick={handleClick}>
                {username}
            </button>
        </>
    )
}