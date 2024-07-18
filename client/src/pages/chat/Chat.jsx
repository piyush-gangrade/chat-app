import react, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Contacts from "../../components/Contacts";
import "./chat.css";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { getAllConnections, newMessage } from "../../api";

export default function Chat() {
    const param = useParams();
    const [connections, setConnections] = useState(null);
    const [messages, setMessages] = useState(null);
    const [currentChat, setCurrentChat] = useState(param?.chatId || null);
    // console.log(currentChat)
    const getConnections = async()=>{
        try{
            const res = await getAllConnections();
            if(res.data?.success){
                setConnections(res.data?.response);
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const sendMessage = async({chatId, senderId, message})=>{
        try{
            const res = await newMessage({
                chatId,
                senderId,
                message
            })
            const messageData = res?.data?.response;
            getConnections()
            if(res.data.success){
                return({
                    _id: messageData?._id,
                    message: messageData?.message,
                    senderId: messageData?.senderId
                })
            }
        }
        catch(err){
            console.error(err);
        }
    }

    
    useEffect(()=>{
        getConnections();
    },[])

    return(
        <div className="home">
            <SideBar/   >
            <div className="main">
                <Contacts  connections={connections} setCurrentChat={setCurrentChat}/>
                <Outlet  context={sendMessage}/>
            </div>
        </div>
    )
}