import ChatsModel from "../models/chats.js";

//get all previous receivers
export const getAllReceivers = async (req, res) => {
    const senderId = req.params.userId;
    console.log(senderId)

    try{
        const senderData = await ChatsModel.findOne({senderId: senderId});
        //if user is not exist
        if(!senderData){
            const userChat = new ChatsModel({
                senderId: senderId,
                chatsData: []
            })
            const data = await userChat.save();
            return res.status(200).json(data.chatsData);
        }

        const receiversData = await senderData.chatsData.map(recData => recData.receiverId);
        return res.status(200).json(receiversData);


    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}

//get all previous
export const getChats = async (req, res)=>{
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;

    try{
        const senderData = await ChatsModel.findOne({senderId: senderId});
        const receiverChatData = senderData.chatsData.filter(recData => recData.receiverId === receiverId);
        return res.status(200).json(receiverChatData);
    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}

export const addNewMessage = async (req, res) => {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    const messageData = {
        message: req.body.message,
        timeStamp: req.body.timeStamp
    }

    try{
        let updatedSenderData = await ChatsModel.findOneAndUpdate(
            { senderId: senderId, "chatsData.receiverId": receiverId },
            { $push: { "chatsData.$.chats": messageData } },
            { new: true }
        );

        // If the sender's data doesn't exist
        if (!updatedSenderData) {
            updatedSenderData = await ChatsModel.findOneAndUpdate(
                { senderId: senderId },
                { $push: { chatsData: { receiverId, chats: [messageData] } } },
                { new: true, upsert: true }
            );
        }
        const receiverChatData = updatedSenderData.chatsData.filter(recData => recData.receiverId === receiverId);
        return res.status(200).json(receiverChatData);
        }
    catch(err){
        return res.status(500).json({Error: err.message})
    }
}