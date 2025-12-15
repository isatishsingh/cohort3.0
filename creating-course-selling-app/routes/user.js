import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  checkCredential,
  checkLoginCred,
} from "../middleware/credential-checker.js";
import { user } from "../db.js";
const JWT_SECRET = process.env.JWT_SECRET;

const UserRouter = Router();

// login route user oriented
UserRouter.post("/login", checkLoginCred, async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  const response = await user.findOne({
    email,
  });

  if (!response) {
    return res.status(403).json({
      message: "User not exist",
    });
  }

  const passwordMatch = await bcrypt.compare(password, response.password);

  if (passwordMatch) {
    const token = jwt.sign({ id: response._id }, JWT_SECRET);

    res.status(200).json({
      token: `${token}`,
      message: "user logged in successfully",
    });
  } else {
    res.status(403).json({
      message: "Email and password are not matched",
    });
  }
});

// signup route
UserRouter.post("/signup", checkCredential, async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    const email = req.body.email.toLowerCase();
    const password = await bcrypt.hash(req.body.password, 5);

    await user.create({
      firstname,
      lastname,
      email,
      password,
    });
  } catch (error) {
    return res.status(404).json({
      message: "This email is already in use",
    });
  }

  return res.status(200).json({
    message: "user registered successfully",
  });
});

export { UserRouter };
