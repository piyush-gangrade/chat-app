import React, { useEffect, useState } from "react";
import addLogo from "../assets/add.svg";
import Popup from "reactjs-popup"
import { getAllUser, newChat } from "../api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddNewChat({onNewChat}) {
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

    const onHandleClick = async(e, close)=>{
        try {
            
            const recieverId = e.target.id;
            const res = await newChat(user, recieverId);
            console.log(res)
            if(res.data?.success){
                const chatId = res.data?.response?._id;
                navigate(`/messages/${chatId}`);
                onNewChat();
                close();
            }
        } 
        catch (error) {
            console.log(error)
        }
        return false
    }

    return (
        <Popup
            trigger={<button><img src={addLogo} alt="add more friends" /></button>}
            modal
            nested
        >
        {close => (
        <div className="add-chat-section">
            <div className="header">
                <h1 > Add New Chat </h1>
                <button className="close-popup" onClick={close}>
                &times;
                </button>
            </div>
            <input type="text" id="search" onChange={(e)=>setSearchVal(e.target.value)} className="search-bar" placeholder="search"/>
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
                    onClick={(e) => onHandleClick(e, close)}
                >
                    {user.username}
                </button>
                )) 
            }
        </div>
    )}
  </Popup>
    )
}