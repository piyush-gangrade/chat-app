import { createContext, useContext, useEffect, useState } from "react";
import { getAllConnections } from "../api";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export default function ChatProvider ({children}){
    const [connections, setConnections] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const getConnections = async()=>{
        try{
            const res = await getAllConnections();
            if(res.data?.success){
                setConnections(res.data?.response);
            }
        }
        catch(err){     
            console.error(err);
        }
    }

    return (
        <ChatContext.Provider value={{connections, setConnections, getConnections, isChatOpen, setIsChatOpen}}>
            {children}
        </ChatContext.Provider>
    )
}
