import { Router } from "express";
import { getAllConnections, getChatId, getMessages, newChat, sendMessage } from "../controller/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
// import { getAllConnections, getChatId } from "../controller/userController.js";
// import { addNewMessage } from "../controller/chatController.js";
// import { getAllUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.use(jwtVerify);

userRouter.get("/get-all-connections", getAllConnections);
userRouter.get("/chat", getChatId);
userRouter.post("/new-chat", newChat);
userRouter.get("/messages", getMessages);
userRouter.post("/send-message", sendMessage);

export default userRouter;
