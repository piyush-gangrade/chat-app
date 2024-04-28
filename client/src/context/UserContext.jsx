import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export default function UserProvider ({children}){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        setUser(user)
        setToken(token)
    }, [])

    return (
        <UserContext.Provider value={{token, setToken, user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
