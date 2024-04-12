import { Router } from "express"
import {signin, login} from "../controller/authController.js";
const authRouter = Router();

authRouter.post("/signup", signin);
authRouter.post("/login", login);

export default authRouter;