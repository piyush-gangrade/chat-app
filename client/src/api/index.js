import axios, { all } from "axios";

const url = "http://localhost:8800";

export const allUsers = async ()=>{
    try{
        const res = await axios.get(`${url}/user/all`);
        return res.data;
    }
    catch(err){
        return err.response.data;
    }
}