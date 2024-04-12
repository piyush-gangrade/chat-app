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
    }
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;