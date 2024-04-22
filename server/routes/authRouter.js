import { Router } from "express"
import {signup} from "../controller/authController.js";
const authRouter = Router();


authRouter.post("/signup", signup);
// authRouter.post("/login", login);
// authRouter.post("/verify", verify)

export default authRouter;