import { Router } from "express";
import { getAllConnections, newChat, getMessages, newMessage } from "../controller/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
// import { getAllConnections, getChatId } from "../controller/userController.js";
// import { addNewMessage } from "../controller/chatController.js";
// import { getAllUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.use(jwtVerify);

userRouter.get("/chat", getAllConnections);
// userRouter.get("/chat", getChatId);
userRouter.post("/new-chat", newChat);
userRouter.get("/messages/:chatId", getMessages);
userRouter.post("/new-message", newMessage);

export default userRouter;
