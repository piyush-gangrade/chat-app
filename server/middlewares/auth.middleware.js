import jwt from "jsonwebtoken";
export const jwtVerify = async(req, res, next)=> {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            const err = new Error("Unauthorized request");
            err.status = 401;
            throw err;
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedToken){
            const err = new Error("Unauthorized request");
            err.status = 401;
            throw err;
        }
        req.user = decodedToken;
        next();
    } 
    catch (err) {
        console.error("jwt verify", err);
        const error = new Error(err.message || "Unauthorized request");
        error.status = err.status || 401;
        next(error);
    }
}