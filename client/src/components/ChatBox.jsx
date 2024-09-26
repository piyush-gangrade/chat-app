import React, { useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Message from "./Message.jsx";
import { useSocket } from "../context/SocketContext.jsx";
import { getMessages, newMessage } from "../api/index.js";
import sendSvg from "../assets/send.svg";
import { useChat } from "../context/ChatContext.jsx";
import back from "../assets/back.svg";

export default function ChatBox(){
    const loaderData = useLoaderData();
    // const [connections, setConnections] = useOutletContext();
    const {connections, setConnections, getConnections, isChatOpen} = useChat();

    const chatData = useRef(loaderData);
    
    const [messageInput, setMessageInput] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    // const [isShow , setIsShow] = useState(false);
    const {user} = useUser();
    const {socket} = useSocket();
    
    chatData.current = loaderData;
    useEffect(()=>{
        setMessages(loaderData.chats || []);
        // setIsShow(prev => !prev);
    },[loaderData])

    // const getConnections = async()=>{
    //     try{
    //         const res = await getAllConnections();
    //         if(res.data?.success){
    //             setConnections(res.data?.response);
    //         }
    //     }
    //     catch(err){     
    //         console.error(err);
    //     }
    // }

    const updateConnections = (chatId)=>{
        const chatToUpdate = connections?.find(connection => connection._id === chatId);
        if(!chatToUpdate){
            getConnections();
        }

        if(chatToUpdate){
            setConnections([
                chatToUpdate,
                ...connections.filter(connection => connection._id !== chatId)
            ]);
        }
    }
    
    const sendChatMessage = async()=>{
        console.log(isConnected)
        if(!isConnected || !messageInput){
            socket?.emit("check-connection", (response)=>{
                setIsConnected(response)
            })
            return;
        }

        try{
            const res = await newMessage({
                chatId: chatData.current?._id,
                senderId: user,
                message: messageInput
            });

            const messageData = res.data?.response;

            if(res.data?.success){

                updateConnections(messageData.chatId);
                console.log(messageData);
            }
            else{
                throw res.data;
            }
        }
        catch(err){
            console.error(err);
        }
        setMessageInput("");
    }

    const onConnect = ()=>{
        setIsConnected(true);
    }

    const onDisconnect = ()=>{
        setIsConnected(false);
    }

    const onRecieveMessage = (mes)=>{
        if( (mes.chatId === chatData.current._id)){
            setMessages(prev => (
                [
                    {_id: mes._id,
                        senderId: mes.senderId,
                        message: mes.message},
                        ...prev
                    ]
                ));
            }
        updateConnections(mes.chatId)
    }

    const onSocketError = (error)=>{
        console.error(error);
    }

    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.on("connected",onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("recieve-message", onRecieveMessage);
        socket.on("socketError", onSocketError);
        return ()=>{
            socket.off("connected", onConnect);
            socket.off("disconect", onDisconnect);
            socket.off("recieve-message", onRecieveMessage);
            socket.off("socketError", onSocketError)
        }
        
    },[socket, connections]);
    
    const messagesEl = messages?.map(mes => {
        return <Message 
                    key={mes._id} 
                    id = {mes._id}
                    message = {mes.message}
                    senderId = {mes.senderId}
                />
    });

    return(
        <div className={`chat-section`}>
            <header className="chat-sec-header">
                <Link className="icon back-btn" to="/">
                    <img src={back} alt="back-btn"/>
                </Link>
                <span>{chatData.current?.name}</span>
            </header>
            <section className="chats-area">
                {messagesEl.length === 0? <div className="no-messages">Send your first message</div>: messagesEl}
            </section>
            <div className="message-bar">
                <input
                    type="text"
                    id="message-text"
                    name="message"
                    placeholder="Type a message..."
                    autoComplete="off"
                    onChange={(e)=>setMessageInput(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            sendChatMessage();
                        }
                    }}
                    value={messageInput}
                />
                <button onClick={sendChatMessage} className="send-btn icon"><img src={sendSvg} alt="send"/></button>
            </div>
        </div>
    )
}