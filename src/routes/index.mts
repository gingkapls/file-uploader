import { Router } from "express";
import { indexGet } from "../controllers/indexController.mjs";

const indexRouter = Router();

indexRouter.get("/", indexGet);

export { indexRouter };
