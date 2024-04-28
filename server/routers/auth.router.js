import { Router } from "express"
import { signup, login, verifyEmail, resendVerification } from "../controller/auth.controller.js";
import { userLoginValidator, userSignupValidator } from "../validators/user.validators.js";
import { validate } from "../validators/validate.js";

const authRouter = Router();

authRouter.route("/signup").post(userSignupValidator(), validate, signup);
authRouter.route("/login").post(userLoginValidator(), validate, login);
authRouter.route("/verify-email/:userId/:token").get(verifyEmail);
authRouter.route("/resend-verification/:userId").get(resendVerification);

// authRouter.post("/verify", verify)

export default authRouter;