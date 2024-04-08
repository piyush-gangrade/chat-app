import React from "react";
import addLogo from "../assets/add.svg"
import navbarLogo from "../assets/nav_bar.svg"

export default function Sidebar(){
    return (
        <div className="sidebar">
            <header className="sidebar--header">
                <img src={navbarLogo} alt="open more options" />
                <h1>Chatter</h1>
                <img src={addLogo} alt="add more friends" />
            </header>
            <main className="sidebar--main">
                <ul className="name-list">
                    <li>Piyush</li>
                    <li>Daksh</li>
                </ul>
            </main>
        </div>
    )
}