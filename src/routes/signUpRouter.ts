import { Router } from "express";
import { signUpGet, signUpPost } from "../controllers/userController.js";

const signUpRouter = Router();

signUpRouter.get("/", signUpGet);
signUpRouter.post("/", signUpPost);

export { signUpRouter };
