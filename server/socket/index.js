import User from "../models/user.js";
import cookieParser from "cookie-parser";

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
            
        }
        catch(err){
            socket.emit(
                "socketError",
                err?.message || "Something went wrong while connecting to the socket."
            );
        }
    })
}