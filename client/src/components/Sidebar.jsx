import React, { useEffect, useState } from "react";
import addLogo from "../assets/add.svg"
import navbarLogo from "../assets/nav_bar.svg"
import { allUsers } from "../api";

export default function Sidebar(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        //set users 
        const users = async ()=>{
            const usersData = await allUsers()
            setUsers(usersData)
        }
        users()
    },[])
    console.log(users)
    //list all users
    const usersList = users.map(user => <li key={user.id} >{user.username}</li>);

    return (
        <div className="sidebar">
            <header className="sidebar--header">
                <img src={navbarLogo} alt="open more options" />
                <h1>Chatter</h1>
                <img src={addLogo} alt="add more friends" />
            </header>
            <main className="sidebar--main">
                <ul className="name-list">
                    {usersList}
                </ul>
            </main>
        </div>
    )
}