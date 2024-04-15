import React, { useEffect, useState } from "react";
import addLogo from "../assets/add.svg"
import { allUsers } from "../api";

export default function Contacts({click}){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        //set users 
        const users = async ()=>{
            const usersData = await allUsers()
            setUsers(usersData)
        }
        users()
    },[])
    //list all users
    const usersList = users.map(user => <li className="contact" key={user.id} onClick={()=>click(user.username)} >{user.username}</li>);

    return (
        <div className="contacts-section">
            <header className="contacts--header">
                <h1>Messages</h1>
                <img src={addLogo} alt="add more friends" />
            </header>
            <main className="contacts--main">
                <ul className="contacts-list">
                    {usersList}
                </ul>
            </main>
        </div>
    )
}