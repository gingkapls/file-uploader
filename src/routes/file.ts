import { Router } from "express";
import { File } from "../models/file.js";
import { uploadSingleFile } from "../controllers/file.js";
const fileRouter = Router();

fileRouter.get("/", (req, res) => res.send("Successfully authenticated"));

fileRouter.post("/upload", uploadSingleFile);

fileRouter.post("/folder/create", async (req, res) => {
  // @ts-expect-error User will always have an id
  const ownerId = req.user.id;
  const { name, parentId } = req.body;

  await File.createFile({ ownerId, name });
  return res.redirect(`/drive/${parentId}`);
});
fileRouter.get("/:fileId", () => {});

export { fileRouter };
