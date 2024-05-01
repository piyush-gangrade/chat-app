import React from "react";


export default function ChatBox(){
    return(
        <div className="chat-section">
            <header className="chat-sec-header">
                <h1>Piyush</h1>
            </header>
            <section className="chats-area">

            </section>
            <form className="message-bar">
                <input
                    type="text"
                    id="message-text"
                    name="message"
                    placeholder="Type a message..."
                    autoComplete="off"
                />
                <button type="submit"></button>
            </form>
        </div>
    )
}