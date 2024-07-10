import mongoose from "mongoose";
import Chat from "../models/chat.js";
import { Message } from "../models/message.js";
import User from "../models/user.js";

export const getAllConnections = async(req, res)=>{
    try{
        const user = req.user?._id || req.body.userId;
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
        const chatId = req.params.chatId;
        const chat = new mongoose.Types.ObjectId(chatId)
        // console.log(chat);
        const chats = await Message.aggregate([
          {
            $match: {
              chatId: {$eq: chat}
            }
          },
          {
            $sort: {
              createdAt: 1
            }
          },
          {
            $group: {
              _id: "$chatId",
              chats: {
                $push: {messageId: "$_id", message: "$message", senderId: "$senderId"}
              }
            }
          },
          {
            $lookup: {
              from: "chats",
              localField: "_id",
              foreignField: "_id",
              as: "chat"
            }
          },
          {
            $addFields: {
              chat: {$first: "$chat"}
            }
          },
          {
            $addFields: {
              members: "$chat.members"
            }
          },
          {
            $project: {
              chat: 0
            }
          }
        ]);
        if(chats.length == 0){
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
        const {chatId, senderId, message} = req.body;
        const sender = new mongoose.Types.ObjectId(senderId);
        const messageData = await Message.create({
            chatId: chatId,
            senderId: sender,
            message: message
        })

        // console.log(newMessage);
        return res.status(201).json({response: messageData, success: true});
    }
    catch(err){
        console.log("send message error");
        console.error(err);
        return res.status(500).json({response: err.message, success: false});
    }
}
