import { RequestHandler } from "express";

const indexGet: RequestHandler = (req, res) => {
  const user = req.body;
  return res.render("index", { user });
};


export { indexGet };

