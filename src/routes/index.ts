import { Router } from "express";
import { indexGet } from "../controllers/index.js";

const indexRouter = Router();

indexRouter.get("/", indexGet);

export { indexRouter };
