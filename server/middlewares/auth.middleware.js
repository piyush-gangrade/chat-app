import jwt from "jsonwebtoken";
export const jwtVerify = async(req, res, next)=> {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            throw new Error("Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken){
            throw new Error("Unauthorized request");
        }
        req.user = decodedToken;
        next();
    } 
    catch (err) {
        console.error("jwt verify", err);
        const error = {
            stack : err,
            message: "Unauthorized request",
            status: 401
        }
        next(error);
    }
}