import react, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Contacts from "../../components/Contacts";
import "./chat.css";
import { Outlet } from "react-router-dom";
import { getAllConnections, newMessage } from "../../api";

export default function Chat() {

    const [connections, setConnections] = useState(null);
    
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
    
    useEffect(()=>{
        getConnections();
    },[])   

    return(
        <div className="home">
            <SideBar />
            <div className="main">
                <Contacts  connections={connections} setCurrentChat={setCurrentChat}/>
                <Outlet context={[connections, setConnections]} />
            </div>
        </div>
    )
}