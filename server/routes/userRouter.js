import { Router } from "express";
import { getAllUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/all", getAllUser)

export default userRouter;