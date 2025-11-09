import { NextFunction, Request, Response } from "express";
import { upload } from "../config/storage/upload.js";

const uploadSingleFile = [
  upload.single("uploaded_file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(new Error("No file found"));

    const { originalname, destination } = req.file;

    console.log("uploaded: ", originalname, "at ", destination);
    res.redirect('/');
  },
];

export { uploadSingleFile };
