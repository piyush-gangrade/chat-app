import React from "react";
import { Comment } from "react-loader-spinner";


export default function Loader(){
    return (
        <div className="loader">
            <Comment
                visible={true}
                height="80"
                width="80"
                ariaLabel="comment-loading"
                wrapperStyle={{position: "absolute", top: "40%", left: "50%"}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
            />
        </div>
    )
}