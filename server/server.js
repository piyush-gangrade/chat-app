import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
// import userRouter from "./routers/userRouter.js";
import { connect_db } from "./database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/auth", authRouter);
// app.use("/user", userRouter);

connect_db();

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
} )