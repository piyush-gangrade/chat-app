import express from "express";
import { createServer} from "http";
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
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true
     }
});
// console.log(io);
const port = 8800;

//for golbal use
app.set("io", io);

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

httpServer.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
} )