import React, { useEffect, useState } from "react";
import addLogo from "../assets/add.svg";
import Connection from "./Connection";
// import { allUsers } from "../api";

export default function Contacts({connections}){

    const contacts = connections?.map((connection)=> {
        return <Connection 
            key={connection._id} 
            chatId={connection._id} 
            username={connection.member.username}
        />
    })
    return (
        <div className="contacts-section">
            <header className="contacts--header">
                <h1>Messages</h1>
                <img src={addLogo} alt="add more friends" />
            </header>
            <main className="contacts--main">
                <ul className="contacts-list">
                    {contacts}
                </ul>
            </main>
        </div>
    )
}