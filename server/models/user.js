import { request } from "express";
import mongoose, { Schema, connection } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    connections: [
        {
            connectionUsername: String,
            chatId: Schema.Types.ObjectId,
            ref: "Chats"
        }
    ]
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;