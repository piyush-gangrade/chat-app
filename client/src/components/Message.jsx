import React from "react"
import { useUser } from "../context/UserContext"

export default function Chat({id, message, senderId}) {
    const {user} = useUser();

    const myMessage = user === senderId? true : false;

    const messageStyle = {
        borderBottomRightRadius: myMessage? 0 : "0.75rem",
        borderBottomLeftRadius: myMessage? "0.75rem" : 0,
        backgroundColor: myMessage? "#5F6493" : "#AFB3D7"
    }

    return (
        <>
            <div className="message-area" style={{justifyContent: myMessage?"end": "start"}}>
                <div className="message" style={messageStyle}  id={id}>
                    {message}
                </div>
            </div>
        </>
    )
}