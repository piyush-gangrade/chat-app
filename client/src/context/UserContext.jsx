import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export default function UserProvider ({children}){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        setUser(user)
        setToken(token)
    }, [])
    
    return (
        <UserContext.Provider value={{token, setToken, user, setUser, setLoading}}>
            {loading && <Loader />}
            {children}
        </UserContext.Provider>
    )
}
