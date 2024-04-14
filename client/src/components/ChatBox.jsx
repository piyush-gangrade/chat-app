import React from "react";
import { Form } from "react-router-dom";


export default function Chat({selectedUser}){
    return(
        <div className="chat-section">
            <header className="chat-sec-header">
                <h1>{selectedUser}</h1>
            </header>
            <section className="chats-area">

            </section>
            <Form className="message-bar">
                <input
                    type="text"
                    id="message-text"
                    name="message"
                    placeholder="Type a message..."
                    autoComplete="off"
                />
                <button type="submit"></button>
            </Form>
        </div>
    )
}