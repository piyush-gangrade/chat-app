import { useContext, useEffect, useMemo, useState} from "react";
import SideBar from "../../components/SideBar";
import Contacts from "../../components/Contacts";
import ChatBox from "../../components/ChatBox";
import "./chat.css";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Chat() {
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