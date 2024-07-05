import mongoose from "mongoose";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import { Message } from "../models/message.js";

export const getAllConnections = async(req, res)=>{
    try{
        const userId = req.user?._id || req.body._id;
        const user = new mongoose.Types.ObjectId(userId);
        const connections = await Chat.find({
            members: {
                $all: [user]
            }
        })
        console.log(connections);
        if(connections.length == 0){
            return res.status(204).json("No connection found")
        }
        return res.status(200).json({response: connections});
    }
    catch(err){
        console.log("get all users error.");
        console.error(err);
        return res.status(500).json({Error: err.message});
    }
}

export const getChatId = async(req, res)=>{
    try{
        const {userId, recieverId} = req.body;
        console.log(userId, recieverId);
        const chat = await Chat.findOne({
            members: {
                $all: [userId, recieverId]
            }
        })
        // console.log(chat);
        return res.status(200).json(chat);
    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}

export const newChat = async (req, res) => {
    try {
        const { userId, recieverId } = req.body;

        let user = new mongoose.Types.ObjectId(userId);
        let receiver = new mongoose.Types.ObjectId(recieverId);

        const newChat = await Chat.create({
            members: [
                user,
                receiver
            ]
        });

        // console.log(newChat)
        const chat = await newChat.save();
        
        return res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ Error: err.message });
    }
};

export const getMessages = async(req, res) => {
    try{
        const chatIdS = req.body.chatId;
        const chatId = new mongoose.Types.ObjectId(chatIdS);
        console.log(chatId); 
        const chats = await Message.find({chatId: chatId});
        // console.log(chats);
        if(chats.length == 0){
            return res.status(204).json("No message availabel");
        }
        return res.status(200).json(chats);
    }
    catch(err){
        console.log("get message error");
        console.error(err);
        return res.status(500).json({ Error: err.message });
    }
}

export const sendMessage = async(req, res)=> {
    try{
        const {chatId, senderId, message} = req.body;
        const chat = new mongoose.Types.ObjectId(chatId);
        const sender = new mongoose.Types.ObjectId(senderId);
        const newMessage = await Message.create({
            chatId: chat,
            senderId: sender,
            message: message
        })

        // console.log(newMessage);
        return res.status(201).json(newMessage);
    }
    catch(err){
        console.log("send message error");
        console.error(err);
        return res.status(500).json({ Error: err.message });
    }
}
