import { Router } from "express"
import {signup} from "../controller/authController.js";
import { userSignupValidator } from "../validators/user.validators.js";
import { validate } from "../validators/validate.js";
const authRouter = Router();


authRouter.route("/signup").post(userSignupValidator(), validate, signup);
// authRouter.post("/login", login);
// authRouter.post("/verify", verify)

export default authRouter;