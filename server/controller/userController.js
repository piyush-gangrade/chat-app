import UserModel from "../models/user.js";

export const getAllUser = async (req, res)=>{
    try{
        const usersData = await UserModel.find();
        const user = usersData.map(userData => ({username: userData.username, id: userData._id}))
        return res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({Error: err.message});
    }
}