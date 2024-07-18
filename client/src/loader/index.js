import { getAllConnections, getMessages, verifyEmail } from "../api"

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

// export const checkLoginLoader = ()=>{
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     if(token && user){
//         return true;
//     }
    
//     return false;
// }

export const homeLoader = async()=>{
    try{
        const res = await getAllConnections();
        // console.log(res);
        return res.data;
    }
    catch(err){
        console.log(err);
        const error = new Error(err);
        if(err.response.status === 401){
            error.status = 401;
        }
        throw error;
    }
}

export const chatLoader = async({params})=>{
    try {
        const res = await getMessages(params.chatId);
        if(!res.data?.success){
            throw new Error(res.data.response);
        }
        return res.data?.response;
    } 
    catch (err) {
        console.log(err);
        return err;
    }
}