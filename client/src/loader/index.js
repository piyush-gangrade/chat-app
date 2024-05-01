import { verifyEmail } from "../api"

export const emailVerifyLoader = async({params})=>{
    console.log(params);
    try{
        const res = await verifyEmail(params.userId, params.token);
        console.log(res)
        return res.data;
    }
    catch(err){
        console.log(err)
        return ({response:err.response.data.Error, status: err.response});
    }
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