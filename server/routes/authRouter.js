import { Router } from "express"
import {signin, login, verifyToken} from "../controller/authController.js";
const authRouter = Router();

authRouter.post("/signup", signin);
authRouter.post("/login", login);
authRouter.get("/verify", verifyToken)

export default authRouter;