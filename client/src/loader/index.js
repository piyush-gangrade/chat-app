import { getAllConnections, verifyEmail } from "../api"

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

export const homeLoader = async()=>{
    try{
        const res = await getAllConnections();
        console.log(res);
    }
    catch(err){
        console.error(err);
        return err;
    }
}