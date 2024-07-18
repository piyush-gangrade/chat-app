import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ({chatId, username, onClick}) {
    const navigate = useNavigate();
    const handleClick = (e)=>{
        const chatId = e.target.id;
        const username = e.target.name;
        onClick(chatId);
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