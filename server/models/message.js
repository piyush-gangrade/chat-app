import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const Message = new mongoose.model("Message", messageSchema);