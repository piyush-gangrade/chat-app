import react, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Contacts from "../../components/Contacts";
import "./chat.css";
import { Outlet, useLoaderData } from "react-router-dom";

export default function Chat() {
    const loaderData = useLoaderData();
    const [connections, setConnections] = useState(null);
    useEffect(()=>{
        if(loaderData?.success){
            setConnections(loaderData.response);
        }
    },[])
    return(
        <div className="home">
            <SideBar />
            <div className="main">
                <Contacts  connections={connections} />
                <Outlet />
            </div>
        </div>
    )
}