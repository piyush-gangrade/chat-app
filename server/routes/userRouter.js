import { Router } from "express";
import { addNewMessage, getAllReceivers, getChats } from "../controller/chatController.js";
import { getAllUser } from "../controller/authController.js";

const userRouter = Router();

userRouter.get("/:userId", getAllReceivers);
userRouter.get("/all", getAllUser);
userRouter.get("/:senderId/:receiverId", getChats);
userRouter.post("/:senderId/:receiverId", addNewMessage);

export default userRouter;