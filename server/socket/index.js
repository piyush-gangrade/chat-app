import User from "../models/user.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

export const initializeSocket = (io) => {
    return io.on("connection", async (socket)=> {
        try{
            const cookies = cookieParser.JSONCookie(socket.handshake.headers?.cookie || "");
            let token = cookies?.accessToken;
            if(!token){
                token = socket.handshake.auth?.token;
            }

            if(!token){
                const error = new Error("Un-authorized handshake. Token is missing ");
                error.status = 401;
                throw error;
            }
            
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const user = await User.findById(decodedToken).select("-password -refershToken -isEmailVerified");
            if(!user){
                const error = new Error("Un-authorized handshake. Token is missing");
                error.status = 401;
                throw error;
            }
            socket.user = user;

            socket.join(user._id.toString());
            socket.emit("connected");

            console.log("user has connected. user id = ", socket.user?._id);

            socket.on("check-connection", (callback) => {
                console.log(`Check connection for user ID: ${socket.user._id}`);
                callback(true);
            });


            socket.on("disconnect", ()=>{
                console.log("user has disconnected. user id = ", socket.user?._id);
                if(socket.user?._id){
                    socket.leave(socket.user._id)
                }
            })
            
        }
        catch(err){
            console.log("socket error ", err);
            socket.emit(
                "socketError",
                err?.message || "Something went wrong while connecting to the socket."
            );
        }
    })
}