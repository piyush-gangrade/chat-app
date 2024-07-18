import mongoose from "mongoose";
import Chat from "../models/chat.js";
import { Message } from "../models/message.js";
import User from "../models/user.js";

export const getAllConnections = async(req, res)=>{
    try{
        const user = req.user?._id || req.body.userId;
        console.log(user)
        const userId = new mongoose.Types.ObjectId(user);
        const connections = await Chat.aggregate([
          {
            $match: {
              members: {
                $elemMatch: {
                  "_id" : {$eq: userId}
                }
              }
            }
          },
          {
            $unwind: "$members"
          },
          {
            $match: {
              "members._id": {
                  $ne: userId
                }
            }
          },
          {
            $addFields: {
              member: "$members"
            }
          },
          {
            $project: {
              members: 0
            }
          },
          {
            $sort: {
              updatedAt: -1
            }
          }
        ])
        if(connections.length == 0){
            return res.status(204).json({response:"No connection found", success:true})
        }
        return res.status(200).json({response: connections, success: true});
    }
    catch(err){
        console.log("get all users error.");
        console.error(err);
        return res.status(500).json({response: err.message, success: false});
    }
}

// export const getChatId = async(req, res)=>{
//     try{
//         const {userId, recieverId} = req.body;
//         console.log(userId, recieverId);
//         const chat = await Chat.findOne({
//             members: {
//                 $all: [userId, recieverId]
//             }
//         })
//         // console.log(chat);
//         return res.status(200).json({response: chat, success: true});
//     }
//     catch(err){
//         return res.status(500).json({response: err.message, success: false});
//     }
// }

export const newChat = async (req, res) => {
    try {
        const { userId, receiverId } = req.body;
        const user = await User.findById(userId);
        const receiver = await User.findById(receiverId);
        // console.log(user, receiver)
        if(!user || !receiver){
          return res.status(404).json({response: "user or receiver not found", success: false})
        }

        const userMember = {
          _id: user._id,
          username: user.username
        }
        
        const receiverMember = {
          _id: receiver._id,
          username: receiver.username
        }

        const existChat = await Chat.findOne(
          {members: {$all: [userMember, receiverMember]}}
        )
        if(existChat){
          return res.status(201).json({response: existChat, success: true})
        }
        const newChat = await Chat.create({
            members: [
              userMember,
              receiverMember
            ]
        });
        
        return res.status(200).json({response: newChat, success: true});
    } catch (err) {
        console.log(err);
        return res.status(500).json({response: err.message, success: false});
    }
};

export const getMessages = async(req, res) => {
    try{
        const chat = req.params.chatId;
        const user = req.user._id;
        const userId = new mongoose.Types.ObjectId(user)
        const chatId = new mongoose.Types.ObjectId(chat)
        // console.log(userId)
        // console.log(chat);
        const chats = await Chat.aggregate([
          {
            $unwind: "$members"
          },
          {
            $match: {
              _id: chatId,
              "members._id": {$ne: userId}
            }
          },
          {
            $addFields: {
              name: "$members.username"
            }
          },
          {
            $lookup: {
              from: "messages",
              localField: "_id",
              foreignField: "chatId",
              as: "chats",
              pipeline: [
                {
                  $sort: {
                    createdAt: 1
                  }
                },
                {
                  $project: {
                    senderId: 1,
                    message: 1
                  }
                }
              ]
            }
          },
          {
            $project: {
              name: 1,
              chats: 1
            }
          }
        
        ]);
        if(chats.length === 0){
            return res.status(204).json({response:"No message availabel", success: true});
        }
        return res.status(200).json({response: chats[0], success: true});
    }
    catch(err){
        console.log("get message error");
        console.error(err);
        return res.status(500).json({response: err.message, success: false});
    }
}

export const newMessage = async(req, res)=> {
    try{
        const {chatId, message} = req.body;
        const senderId = req.user._id;
        const sender = new mongoose.Types.ObjectId(senderId);
        const messageData = await Message.create({
            chatId: chatId,
            senderId: sender,
            message: message
        })

        const chatData = await Chat.updateOne(
          {_id: chatId},
          {updatedAt: new Date()},
          {new : true}
        )
        // console.log(chatData)
        // console.log(newMessage);
        return res.status(201).json({response: messageData, success: true});
    }
    catch(err){
        console.log("send message error");
        console.error(err);
        return res.status(500).json({response: err.message, success: false});
    }
}
