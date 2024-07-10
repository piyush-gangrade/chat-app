import React, { useState } from "react";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Message from "./Message.jsx";

export default function ChatBox(){
    const loaderData = useLoaderData();
    const {user} = useUser();
    
    const members = loaderData?.members;
    const member = members[0] != user? members[0]: members[1];
    const chats= loaderData?.chats;
    console.log(chats);

    return(
        <div className="chat-section">
            <header className="chat-sec-header">
                <h1>{member?.username}</h1>
            </header>
            <section className="chats-area">
                <Message />
            </section>
            <form className="message-bar">
                <input
                    type="text"
                    id="message-text"
                    name="message"
                    placeholder="Type a message..."
                    autoComplete="off"
                />
                <button type="submit"></button>
            </form>
        </div>
    )
}