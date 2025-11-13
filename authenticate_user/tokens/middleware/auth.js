import express from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

app.use(express.json());

export function checkUser(req, res, next) {
  try {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.userName = decodedData.userName;
    next();
  } catch (error) {
    res.status(404).json({
      message: `Please make sure you're login first`,
      error: error,
    });
  }
}
