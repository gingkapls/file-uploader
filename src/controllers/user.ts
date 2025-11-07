import { Request, RequestHandler, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

// const prisma = new PrismaClient();

const validateUser: ValidationChain[] = [
  body("username").trim().escape().isLength({ min: 3, max: 25 }),
  body("password").isLength({ min: 3 }),
];

const signUpGet: RequestHandler = (req, res) => {
  res.render("sign-up.ejs");
};

const signUpPostHandler: RequestHandler = async (req, res) => {
  const result = validationResult(req);

  // sad path D:
  if (!result.isEmpty()) {
    return res.render("sign-up", { errors: result.array() });
  }

  // happy path :D
  const { username, password } = req.body;
  const numRounds = 10;

  const hashedPass = await bcrypt.hash(password, numRounds);

  await User.create({
    data: {
      username,
      password: hashedPass,
    },
  });

  return res.render("/login", { username });
};

const signUpPost = [...validateUser, signUpPostHandler];

const loginPostHandler: RequestHandler = async (req, res) => {};

const loginPost = [...validateUser, loginPostHandler];

export { signUpGet, signUpPost };
