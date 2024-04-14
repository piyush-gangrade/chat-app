import axios from "axios";

export const homeLoader = async ()=>{
    try{
        const token = localStorage.getItem("token");
        if(!token){
            return {Error: "Token is not available"}
        }
        const res = await axios.get("http://localhost:8800/auth/verify", {
            headers: { 
                "Authorization" : token
            }
        })
        return res.data;
    }
    catch(err){
        return err.response.data;
    }
}