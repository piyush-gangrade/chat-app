import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtKey = process.env.JWT_KEY;

export const signin = async (req, res) => {
    try{
        const username = req.body.username;
        const password = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email;
        const existingUsername = await UserModel.findOne({username: username});
        const existingEmail = await UserModel.findOne({email: email});

        if(existingUsername){
            return res.status(409).json({Error: "User is already exist."});
        }

        if(existingEmail){
            return res.status(409).json({Error: "Email is already exist."})
        }

        const newUser = new UserModel({
            username: username,
            email: email,
            password: password
        })

        const user = await newUser.save();

        jwt.sign({user}, jwtKey, {expiresIn: "2h" }, (err, token)=>{
            if(err){
                return res.status(500).json({Error: err.message});
            }
            return res.status(200).json({user, token});
        })

    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}

export const login = (req, res) => {
    console.log(req);
}