import { Router } from "express"
import { signup, login, verifyEmail, refershAccessToken, logout } from "../controller/auth.controller.js";
import { userLoginValidator, userSignupValidator } from "../validators/user.validators.js";
import { validate } from "../validators/validate.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.route("/signup").post(userSignupValidator(), validate, signup);
authRouter.route("/login").post(userLoginValidator(), validate, login);
authRouter.route("/refersh-access-token").post(refershAccessToken);
authRouter.route("/verify-email/:userId/:token").get(verifyEmail);
authRouter.route("/logout").post(jwtVerify,logout);

// authRouter.post("/verify", verify)

export default authRouter;