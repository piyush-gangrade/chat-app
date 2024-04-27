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

//get all previous connections
export const getAllConnections = async (req, res) => {
    const userId = req.params.userId;
    try{
        const userData = await UserModel.findById(userId);
        return res.status(200).json(userData.connections);
    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}

export const getChatId = async (req, res) => {
    const userId = req.params.senderId;
    const receiverId = req.params.receiverId; 
    
    try {
        const userData = await UserModel.findById(userId);
        const connection = userData.connections.find(connection => connection.connectionId === receiverId); 
        
        if (connection) {
            return res.status(200).json(connection.chatId); 
        } else {
            return res.status(404).json({ Error: 'Connection not found' });
        }
    } catch(err) {
        return res.status(500).json({ Error: err.message });
    }
}

// export const addNewMessage = async (req, res) => {
//     const senderId = req.params.senderId;
//     const receiverId = req.params.receiverId;
//     const messageData = {
//         message: req.body.message,
//         timeStamp: req.body.timeStamp
//     }

//     try{
//         let updatedSenderData = await UserModel.findOneAndUpdate(
//             { senderId: senderId, "chatsData.receiverId": receiverId },
//             { $push: { "chatsData.$.chats": messageData } },
//             { new: true }
//         );

//         // If the sender's data doesn't exist
//         if (!updatedSenderData) {
//             updatedSenderData = await UserModel.findOneAndUpdate(
//                 { senderId: senderId },
//                 { $push: { chatsData: { receiverId, chats: [messageData] } } },
//                 { new: true, upsert: true }
//             );
//         }
//         const receiverChatData = updatedSenderData.chatsData.filter(recData => recData.receiverId === receiverId);
//         return res.status(200).json(receiverChatData);
//         }
//     catch(err){
//         return res.status(500).json({Error: err.message})
//     }
// }

// //get all previous
// export const getChats = async (req, res)=>{
//     const senderId = req.params.senderId;
//     const receiverId = req.params.receiverId;

//     try{
//         const senderData = await ChatsModel.findOne({senderId: senderId});
//         const receiverChatData = senderData.chatsData.filter(recData => recData.receiverId === receiverId);
//         return res.status(200).json(receiverChatData);
//     }
//     catch(err){
//         return res.status(500).json({Error: err.message});
//     }
// }

// export const addNewMessage = async (req, res) => {
//     const senderId = req.params.senderId;
//     const receiverId = req.params.receiverId;
//     const messageData = {
//         message: req.body.message,
//         timeStamp: req.body.timeStamp
//     }

//     try{
//         let updatedSenderData = await ChatsModel.findOneAndUpdate(
//             { senderId: senderId, "chatsData.receiverId": receiverId },
//             { $push: { "chatsData.$.chats": messageData } },
//             { new: true }
//         );

//         // If the sender's data doesn't exist
//         if (!updatedSenderData) {
//             updatedSenderData = await ChatsModel.findOneAndUpdate(
//                 { senderId: senderId },
//                 { $push: { chatsData: { receiverId, chats: [messageData] } } },
//                 { new: true, upsert: true }
//             );
//         }
//         const receiverChatData = updatedSenderData.chatsData.filter(recData => recData.receiverId === receiverId);
//         return res.status(200).json(receiverChatData);
//         }
//     catch(err){
//         return res.status(500).json({Error: err.message})
//     }
// }