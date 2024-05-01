import React, { useEffect, useState } from "react";
import addLogo from "../assets/add.svg"
// import { allUsers } from "../api";

export default function Contacts(){
    return (
        <div className="contacts-section">
            <header className="contacts--header">
                <h1>Messages</h1>
                <img src={addLogo} alt="add more friends" />
            </header>
            <main className="contacts--main">
                <ul className="contacts-list">
                    
                </ul>
            </main>
        </div>
    )
}