import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniquePrefix = crypto.randomUUID();
    const extension = file.originalname.split(".").at(-1);
    cb(null, uniquePrefix + (extension && "." + extension));
  },
});

export const upload = multer({ storage });
