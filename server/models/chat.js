import mongoose, { Schema } from "mongoose";

const memberData = {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        username: {
            type: String,
            required: true
        }
}

const ChatSchema = new mongoose.Schema(
    {
        members: [memberData]
    },
    {
        timestamps: true,
    }
);

const Chat= new mongoose.model("Chat", ChatSchema);

export default Chat;