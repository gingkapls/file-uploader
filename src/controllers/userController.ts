import { Request, RequestHandler, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/client.js";

// const prisma = new PrismaClient();
const prisma = new PrismaClient();

const validateUser: ValidationChain[] = [
  body("username").trim().escape().isLength({ min: 3, max: 25 }),
  body("password").isLength({ min: 3 }),
];

const signUpGet: RequestHandler = (req, res) => {
  res.render("sign-up.ejs");
};

const signUpPost = [
  ...validateUser,
  async (req: Request, res: Response) => {
    const result = validationResult(req);

    // sad path D:
    if (!result.isEmpty()) {
      return res.render("sign-up", { errors: result.array() });
    }

    // happy path :D
    const { username, password } = req.body;
    const numRounds = 10;

    const hashedPass = await bcrypt.hash(password, numRounds);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPass,
      },
    });

    console.log({ user });
    return res.redirect("/login");
  },
];

export { signUpGet, signUpPost };
