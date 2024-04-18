import mongoose from "mongoose";

const ChatsSchema = new mongoose.Schema(
    {
        chats: {
            type: Array
        }
    },
    {
        timestamps: true
    }
);

const ChatsModel = new mongoose.model("Chats", ChatsSchema);

export default ChatsModel;