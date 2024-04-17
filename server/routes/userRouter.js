import { Router } from "express";
import { getAllConnections, getChatId } from "../controller/userController.js";
import { addNewMessage } from "../controller/chatController.js";
import { getAllUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/:userId", getAllConnections);
userRouter.get("/all", getAllUser);
// userRouter.get("/:senderId/:receiverId", getChats);
userRouter.get("/:senderId/:receiverId", getChatId);

export default userRouter;