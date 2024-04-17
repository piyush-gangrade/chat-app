import { Schema, model } from "mongoose";

const ChatsSchema = new Schema(
    {
        chats: {
            type: Array
        }
    },
    {
        timestamps: true
    }
);

const ChatsModel = new model("Chats", ChatsSchema);

export default ChatsModel;