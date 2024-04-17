import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    connections: {
        type: Array
    }
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;