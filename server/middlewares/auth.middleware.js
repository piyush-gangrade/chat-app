import jwt from "jsonwebtoken";
export const jwtVerify = async(req, res, next)=> {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token) {
        throw new Error("Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken){
            throw new Error("Invalid access token");
        }
        req.user = decodedToken;
        next();
    } 
    catch (error) {
        console.log("jwt verify error");
        console.error(error);
        throw new Error("Unauthorized request");
    }
}