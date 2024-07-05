import mongoose, { Schema } from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        members: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    },
    {
        timestamps: true,
    }
);

const Chat= new mongoose.model("Chat", ChatSchema);

export default Chat;