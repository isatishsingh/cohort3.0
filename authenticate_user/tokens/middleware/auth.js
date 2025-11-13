import express from "express";
import jwt from "jsonwebtoken";
import { users } from "./../index.js";
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

app.use(express.json());

export function checkUser(req, res, next) {
  try {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData.userName) {
      req.userName = decodedData.userName;
      next();
    } else {
      res.status(404).json({
        message: `You're not logged in so login first`,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: `Please make sure you're login first`,
      error: error,
    });
  }
}
