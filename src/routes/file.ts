import { Router } from "express";
import {
    createFolder,
    downloadSingleFile,
    getFolderContents,
    uploadSingleFile,
} from "../controllers/file.js";
const fileRouter = Router();

fileRouter.get("/{:id}", getFolderContents);
fileRouter.get("/download/{:id}", downloadSingleFile);

fileRouter.post("/upload", uploadSingleFile);

fileRouter.post("/folder/create", createFolder);
fileRouter.get("/download/:id", downloadSingleFile);

export { fileRouter };
