import React, { useState } from "react";
import { Form, useLoaderData, useLocation, useOutletContext, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Message from "./Message.jsx";

export default function ChatBox(){
    const loaderData = useLoaderData();
    const sendMessage = useOutletContext();
    const [messageInput, setMessageInput] = useState("");
    const {user} = useUser();
    
    const name = loaderData?.name;
    const messages= loaderData?.chats;
    const chatId = loaderData?._id;

    
    const sendChatMessage = async()=>{
        const res = await sendMessage({
            senderId: user,
            message: messageInput,
            chatId
        })
        console.log(res)
        messages.push(res);
        setMessageInput("");
    }
    
    const messagesEl = messages?.map(mes => {
        return <Message 
                    key={mes._id} 
                    id = {mes._id}
                    message = {mes.message}
                    senderId = {mes.senderId}
                />
    });

    return(
        <div className="chat-section">
            <header className="chat-sec-header">
                <h1>{name}</h1>
            </header>
            <section className="chats-area">
                {messagesEl.length === 0? <div className="no-messages">Send your first message</div>: messagesEl}
            </section>
            <div className="message-bar">
                <input
                    type="text"
                    id="message-text"
                    name="message"
                    placeholder="Type a message..."
                    autoComplete="off"
                    onChange={(e)=>setMessageInput(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            sendChatMessage();
                        }
                    }}
                    value={messageInput}
                />
                <button onClick={sendChatMessage}>Send</button>
            </div>
        </div>
    )
}