import React from "react";

export default function ({_id, username, handleClick}) {
    
    return (
        <>
            <button id={_id} name={username} className="contact" onClick={handleClick}>
                {username}
            </button>
        </>
    )
}