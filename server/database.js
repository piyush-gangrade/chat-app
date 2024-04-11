import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();


export const connect_db = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully connected to the database")
    } catch (error) {
        console.log('Connection to database failed.')
        console.error(error.message);
    }
}