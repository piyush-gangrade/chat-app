import React, { createContext, useContext, useEffect, useState } from "react"
import socketio from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({children}) {
    const [socket, setSocket] = useState(null);
    const [token] = useUser();
    

    useEffect(()=>{
        const accessToken = localStorage.getItem("token") || token;
        const res = socketio(import.meta.env.VITE_SERVER_URL, {
            withCredentials: true,
            auth: { accessToken }
        })
        setSocket(res);
    },[])

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}