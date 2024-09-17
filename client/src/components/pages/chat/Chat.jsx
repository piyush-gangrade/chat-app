import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../SideBar.jsx";
import Contacts from "../../Contacts.jsx";
import "./chat.css";
import { getAllConnections } from "../../../api";

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
            console.err(err)
        }
    }
    
    useEffect(()=>{
        getConnections();
    },[])

    return(
        <div className="home">
            <SideBar />
            <div className="main">
                <Contacts  connections={connections} onNewChat={()=>{getConnections()}} />
                <Outlet context={[connections, setConnections]} />
            </div>
        </div>
    )
}