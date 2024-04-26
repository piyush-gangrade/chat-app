import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { connect_db } from "./database.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRouter);
app.use("/user", userRouter);

connect_db();

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
} )