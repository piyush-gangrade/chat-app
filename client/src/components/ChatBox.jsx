import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Message from "./Message.jsx";
import { useSocket } from "../context/SocketContext.jsx";
import { newMessage } from "../api/index.js";
import sendSvg from "../assets/send.svg";

export default function ChatBox(){
    const loaderData = useLoaderData();
    const [connections, setConnections] = useOutletContext();
    const [messageInput, setMessageInput] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const {user} = useUser();
    const {socket} = useSocket();
    
    const name = loaderData?.name;
    const chatId = loaderData?._id;
    useEffect(()=>{
        setMessages(loaderData.chats)
    },[loaderData])

    const updateConnections = (chatId)=>{
        const chatToUpdate = connections?.find(connection => connection._id === chatId);

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
                chatId,
                senderId: user,
                message: messageInput
            });

            const messageData = res.data?.response;

            if(res.data?.success){
                setMessages(prev => (
                   [ 
                       {_id: messageData._id,
                        senderId: messageData.senderId,
                        message: messageData.message},
                        ...prev
                ]
                ))

                updateConnections(messageData.chatId);
                console.log(messageData);
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
        console.log(mes)
        if((mes.senderId !== user) && (mes.chatId === chatId)){
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
        <div className="chat-section">
            <header className="chat-sec-header">
                <h1>{name}</h1>
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
                <button onClick={sendChatMessage} className="send-btn"><img src={sendSvg} alt="send"/></button>
            </div>
        </div>
    )
}