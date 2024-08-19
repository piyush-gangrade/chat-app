import React from "react";
import { useNavigate } from "react-router-dom";
import Connection from "./Connection";
import AddNewChat from "./AddNewChat";

export default function Contacts({connections, onNewChat}){
    const navigate = useNavigate();
    const onHandleClick = (e)=>{
        const chatId = e.target.id;
        const username = e.target.name;
        navigate(`${chatId}`)
    }

    const contacts = connections?.map((connection)=> {
        return <Connection 
            key={connection._id} 
            _id={connection._id} 
            username={connection.member.username}
            handleClick={onHandleClick}
        />
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