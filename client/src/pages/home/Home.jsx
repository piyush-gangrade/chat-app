import { useContext, useEffect, useState} from "react";
import { useUser } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
// import { Navigate, useLoaderData } from "react-router-dom";
// import SideBar from "../../components/SideBar";
// import Contacts from "../../components/Contacts";
// import ChatBox from "../../components/ChatBox";
// import "./home.css";

export default function Home() {
    const {token} = useUser();
    
    if(!token){
        return <Navigate to="/auth/login"/>;
    }
//     const loaderData = useLoaderData();
//     const { userData, setUserData } = useContext(UserContext);
//     const socket = useRef();
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const [receivedMsg, setReceivedMsg] = useState(null);
//     const [sendMsg, setSendMsg] = useState(null);
//     const [receiverUser, setReceiverUser] = useState(null)

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
                   <Contacts click={setReceiverUser}/>
                    <ChatBox 
                    currentUser = {userData.username}
                    setSendMsg = {setSendMsg}
                    receivedMsg = {receivedMsg}
                    receiverUser={receiverUser}
                />
            </div>
        </div>
    )
}