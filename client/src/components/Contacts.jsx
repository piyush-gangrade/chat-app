import React from "react";
import { useNavigate } from "react-router-dom";
import AddNewChat from "./AddNewChat";

export default function Contacts({connections, onNewChat}){
    const navigate = useNavigate();

    const onHandleClick = (e)=>{
        const chatId = e.target.id;
        navigate(`/messages/${chatId}`)
    }

    const contacts = connections?.map((connection)=> {
        return  <button 
                    key={connection._id}
                    id={connection._id} 
                    name={connection.member.username} 
                    className="contact" 
                    onClick={onHandleClick}
                >
                    {connection.member.username}
                </button>
    });
    
    return (
        <div className="contacts-section">
            <header className="contacts--header">
                <h1>Messages</h1>
                <AddNewChat onNewChat={onNewChat} />
            </header>
            <main className="contacts--main">
                <ul className="contacts-list">
                    {contacts}
                </ul>
            </main>
        </div>
    )
}