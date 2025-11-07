import { Router } from "express";
import { signUpGet, signUpPost } from "../controllers/user.js";

const authRouter = Router();

authRouter.get("/", signUpGet);
authRouter.post("/", signUpPost);

export { authRouter };
