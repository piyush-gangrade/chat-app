import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        members: {
            type: Array
        }
    },
    {
        timestamps: true,
    }
);

const ChatModel = new mongoose.model("Chats", ChatSchema);

export default ChatModel;