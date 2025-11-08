import { RequestHandler } from "express";

const indexGet: RequestHandler = (req, res) => {
  return res.render("index");
};


export { indexGet };

