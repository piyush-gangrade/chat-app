import { Router } from "express"

const authRouter = Router();

authRouter.post("/signin", signin);
authRouter.post("/login", login);

export default authRouter;