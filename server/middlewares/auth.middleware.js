import jwt from "jsonwebtoken";
export const jwtVerify = async(req, res, next)=> {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token)
    try {
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
    catch (error) {
        console.error("jwt verify", error);
        next(error);
    }
}