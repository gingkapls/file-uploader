import "dotenv/config";
import express, { urlencoded } from "express";
import { indexRouter } from "./routes/index.js";
import { resolve } from "node:path";
import { signUpRouter } from "./routes/signUpRouter.js";

const app = express();
const PORT = 8080;

// view engine setup
app.set("view engine", "ejs");
app.set("views", resolve(import.meta.dirname, "views"));

app.use(urlencoded({ extended: false }));

// routes
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
