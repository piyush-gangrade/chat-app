import { useContext, useEffect, useMemo, useState} from "react";
import SideBar from "../../components/SideBar";
import Contacts from "../../components/Contacts";
import ChatBox from "../../components/ChatBox";
import "./chat.css";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Chat() {
//     const socket = useRef();
    const {user, token} = useUser();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [receivedMsg, setReceivedMsg] = useState(null);
    const [sendMsg, setSendMsg] = useState(null);
    const [receiverUser, setReceiverUser] = useState(null)

//     useEffect(()=>{
//         if(loaderData.Error){
//             console.error(loaderData.Error)
//             setUserData(prev => ({
//                 ...prev,
//                 login: false
//             }))
//         }

//     },[loaderData])

//     if(!userData.login){
//         return <Navigate to="/auth/login" />
//     }

//     //socket 
//     useEffect(()=>{
//         socket.current = io("http://localhost:3000");
//         socket.current.emit("new-user-add", userData.username);
//         socket.current.on("get-users", (users) => {
//             setOnlineUsers(users);
//         })
//     },[userData])
        
//     useEffect(()=>{
//         socket.current.on("recieve-message", (data)=> {
//             setReceivedMsg(data);
//         })
//     })

    return(
        <div className="home">
            <SideBar />
            <div className="main">
                <Contacts />
                <Outlet />
            </div>
        </div>
    )
}