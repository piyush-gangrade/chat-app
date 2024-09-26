import { useEffect, useState } from "react";
import { Outlet, useParams, json, useActionData, useLoaderData } from "react-router-dom";
import SideBar from "../../HeaderBar.jsx";
import Contacts from "../../Contacts.jsx";
import "./chat.css";
import { getAllConnections } from "../../../api";
import ChatBox from "../../ChatBox.jsx";
import { useChat } from "../../../context/ChatContext.jsx";

export default function Chat() {
    const params = useParams();
    const loaderData = useLoaderData();
    const {setConnections, connections, getConnections, isChatOpen , setIsChatOpen} = useChat();
    // const [connections, setConnections] = useState(loaderData);

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
    useEffect(()=>{
        setConnections(loaderData || [])
    },[loaderData])
    
    useEffect(()=>{
        if(params?.chatId){
            setIsChatOpen(true);
        }
        else{
            setIsChatOpen(false);
        }
    }, [params?.chatId])
    
// console.log(isChatOpen)
    return(
        <div className="home">
            <SideBar />
            <div className="main">
                <Contacts  connections={connections} getConnections={()=>getConnections()} />
                {!isChatOpen && <>
                    <div className="chat-section close-chat-section">
                        <div className="close-chat-section-text">Get Start Chatting...</div>
                    </div>
                </>}
                <Outlet context={[connections, setConnections]}/>
            </div>
        </div>
    )
}