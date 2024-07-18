import express from "express";
import { createServer} from "node:http";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
// import userRouter from "./routers/userRouter.js";
import { connect_db } from "./database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.js";
import { Server } from "socket.io";
import { errorHandle } from "./middlewares/error.middleware.js";
import { initializeSocket } from "./socket/index.js";
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true
     }
});

const port = 8800;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);

initializeSocket(io);

app.use(errorHandle);
connect_db();

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
} )