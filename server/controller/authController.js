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
                return res.status(500).json({Error: "Something goes wrong. Please try again later"});
            }
            return res.status(200).json({user, token});
        })

    }
    catch(err){
        return res.status(500).json({Error: "Something goes wrong. Please try again later"});
    }
}

export const login = async (req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

        const user = await UserModel.findOne({username: username});
        if(!user){
            return res.status(400).json({Error: "Username is not found."});
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(400).json({Error: "Wrong Password"})
        }

        jwt.sign({ user }, jwtKey, {expiresIn: '2h'}, (err, token)=>{
            if(err){
                return res.status(500).json({Error: "Something goes wrong. Please try again later"})
            }

            return res.status(200).json({user, token});
        } )
    }
    catch(err){
        return res.status(500).json({Error: "Something goes wrong. Please try again later"})
    }
}

export const verifyToken = (req, res)=>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, jwtKey);
        return res.status(200).json(decoded.user);
    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}