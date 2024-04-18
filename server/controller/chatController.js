import { request } from "express";
import ChatsModel from "../models/chats.js";
import UserModel from "../models/user.js";



export const addNewMessage = async (req, res)=>{
    const chatId = req.params.chatId;
    const messageData = {
        sendBy: req.params.senderId,
        message: req.body.message,
        timeStamp: req.body.timeStamp
    }
    try{
        // If the sender's data doesn't exist
        if (chatId) {
            const newChat = new ChatsModel({
                chats: [messageData]
            });
            await addNewConnection(messageData.sendBy, req.body.receiverId, newChat._id)

            const data = await newChat.save();
            return res.status(200).json(newChat);
        }
        const updatedChatData = await ChatsModel.findOneAndUpdate(
            { chatId: chatId},
            { $push: { chats:  messageData} },
            { new: true }
        );
        const data = await updatedChatData.save();
        return res.status(200).json(updatedChatData)
        }
    catch(err){
        return res.status(500).json({Error: err.message})
    }
}

async function addNewConnection(senderId, receiverId, chatId){
    try{
        const updatedSenderData = await UserModel.findOneAndUpdate(
            {_id: senderId},
            {$push: {connections:   {connectionId: receiverId, chatId: chatId}}}
        )
        console.log(updatedSenderData);
    }
    catch(err){
        console.log(err.message)
    }
}