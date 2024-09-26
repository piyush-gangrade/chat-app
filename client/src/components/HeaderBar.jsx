import React from "react";
import { useUser } from "../context/UserContext";
import logoSvg from "../assets/logo.svg"
import logoutSvg from "../assets/logout.svg";
import { logout } from "../api";

export default function SideBar() {
    const {setToken, setUser, user} = useUser();

    const handleClick = async()=>{
        localStorage.clear();
        try{
            const res = await logout(user);
            if(res.data?.success){
                setToken(null);
                setUser(null);
            }
            else{
                throw res.data;
            }    
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div className="header-bar">
            <div className="logo icon">
                <img src={logoSvg} alt="logo" />
            </div>
            <button className="log-out icon" onClick={handleClick}>
                <img src={logoutSvg} alt="logout" />
            </button>
        </div>
        

    )
}