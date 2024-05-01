import { verifyEmail } from "../api"

export const emailVerifyLoader = async({params})=>{
    try{
        const res = await verifyEmail(params.userId, params.token);
        return ({response: res.data, status: res.status});
    }
    catch(err){
        console.error(err.response)
        return ({response:err.response.data.Error, status: err.response.status});
    }
}

export const checkLoginLoader = ()=>{
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if(token && user){
        return true;
    }
    
    return false;
}


// export const homeLoader = async ()=>{
//     try{
//         const token = localStorage.getItem("token");
//         if(!token){
//             return {Error: "Token is not available"}
//         }
//         const res = await axios.get("http://localhost:8800/auth/verify", {
//             headers: { 
//                 "Authorization" : token
//             }
//         })
//         return res.data;
//     }
//     catch(err){
//         return err.response.data;
//     }
// }