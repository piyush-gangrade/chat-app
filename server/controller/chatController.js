import ChatsModel from "../models/chats.js";

export const addNewMessage = async (req, res)=>{
    const chatId = req.params.chatId;
    const messageData = {
        sendBy: req.body.senderId,
        message: req.body.message,
        timeStamp: req.body.timeStamp
    }
    try{
        // If the sender's data doesn't exist
        if (!chatId) {
            const newChat = new ChatsModel(
                [messageData]
            );
            return res.status(200).json(newChat);
        }
        const updatedChatData = await ChatsModel.findOneAndUpdate(
            { chatId: chatId},
            { $push: { chats:  messageData} },
            { new: true }
        );
        return res.status(200).json(updatedChatData)
        }
    catch(err){
        return res.status(500).json({Error: err.message})
    }
}