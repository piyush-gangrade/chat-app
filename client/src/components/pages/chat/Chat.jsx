import { useEffect, useState } from "react";
import { Outlet, useParams, json, useActionData, useLoaderData } from "react-router-dom";
import SideBar from "../../SideBar.jsx";
import Contacts from "../../Contacts.jsx";
import "./chat.css";
import { getAllConnections } from "../../../api";
import ChatBox from "../../ChatBox.jsx";

export default function Chat() {
    const params = useParams();
    const loaderData = useLoaderData();
    const [connections, setConnections] = useState(loaderData)
    // console.log(loaderData)

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

    return(
        <div className="home">
            <SideBar />
            <div className="main">
                <Contacts  connections={connections} getConnections={()=>getConnections()} />
                <Outlet context={[connections, setConnections]}/>
            </div>
        </div>
    )
}