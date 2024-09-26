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


export const homeLoader = async()=>{
    try{
        const res = await getAllConnections();
        console.log(res)
        return res.data?.response || null;
    }
    catch(err){
        console.error(err);
        const error = new Error(err);
        if(err.response.status === 401){
            error.status = 401;
        }
        throw err;
    }
}

export const chatLoader = async({params})=>{
    try {
        const res = await getMessages(params.chatId);
        if(!res.data?.success){
            throw res;
        }
        return res.data?.response;
    } 
    catch (err) {
        console.log(err);
        throw err;
    }
}