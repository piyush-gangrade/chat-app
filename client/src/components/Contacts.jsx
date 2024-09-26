import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNewChat from "./AddNewChat";
import { useChat } from "../context/ChatContext";
import addLogo from "../assets/add.svg"

export default function Contacts(/*{connections, getConnections}*/){
    const navigate = useNavigate();
    const {connections, getConnections, setIsChatOpen} = useChat();
    const [openNewChat, setOpenNewChat] = useState(false)

    const onHandleClick = (e)=>{
        const chatId = e.target.id;
        setIsChatOpen(true);
        navigate(`/messages/${chatId}`)
    }
console.log(connections)
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
        <>
            <div className="contacts-section">
                <div className="contacts--header">
                    <span>Messages</span>
                    <button className="icon" onClick={()=>setOpenNewChat(true)}><img src={addLogo} alt="add more friends" /></button>
                </div>
                <div className="contacts-list">
                    {contacts}
                </div>
            </div>
            {openNewChat && <AddNewChat onNewChat={getConnections} open={setOpenNewChat} />}
        </>
    )
}