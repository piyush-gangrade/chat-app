import React, { useEffect, useState } from "react";
import { getAllUser, newChat } from "../api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddNewChat({onNewChat, open}) {
    const navigate = useNavigate();

    const {user} = useUser();

    const [allUser, setAllUser] = useState([]);
    const [searchVal, setSearchVal] = useState("");

    useEffect(()=>{
        async function getUsers(){
            try{
                const res = await getAllUser(user);
                if(res.data?.success){
                    setAllUser(res.data?.response)
                }
                else{
                    console.error(res.data)
                }
            }
            catch(err){
                console.error(err);
            }
        }
        getUsers();
    },[])

    const onHandleClick = async(e, open)=>{
        try {
            
            const recieverId = e.target.id;
            const res = await newChat(user, recieverId);
            console.log(res)
            if(res.data?.success){
                const chatId = res.data?.response?._id;
                navigate(`/messages/${chatId}`);
                onNewChat();
                open(false);
            }
        } 
        catch (error) {
            console.log(error)
        }
        return false
    }

    return (
        <div className="add-chat-section">
            <div className="add-chat-header">
                <span>New Chat</span>
                <button className="close-add-chat" onClick={()=>open(false)}>
                &times;
                </button>
            </div>
            <input type="text" id="search" onChange={(e)=>setSearchVal(e.target.value)} className="search-bar" placeholder="search"/>
            <div className="all-contact">
                {allUser
                    .filter(user => {
                        if(user.username.toLowerCase().includes(searchVal.toLowerCase())){
                            return true;
                        }
                        else{
                            false;
                        }
                    })
                    .map(user=> (
                        <button 
                        key={user._id}
                        id={user._id} 
                        name={user.username} 
                        className="contact" 
                        onClick={(e) => onHandleClick(e, open)}
                    >
                        {user.username}
                    </button>
                    )) 
                }
            </div>
        </div>
    
)}