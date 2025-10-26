import express from "express";
import { indexRouter } from "./routes/index.mjs";
import { resolve } from "node:path";

const app = express();
const PORT = 8080;

// view engine setup
app.set("view engine", "ejs");
app.set("views", resolve(import.meta.dirname, "views"));

// routes
app.get("/", indexRouter);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
