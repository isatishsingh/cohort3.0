import "../loadEnv.js";
import bcrypt from "bcrypt";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import z from "zod";
import cors from "cors";
import { userModel, todoModel } from "./db.js";
import { auth } from "./middleware/auth.js";
import { isExist } from "./middleware/checkUserExist.js";
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

// connecting server
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
const app = express();

app.use(express.json());
app.use(cors());

// user signup route
// we can add middleware or else our try catch will handle it
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  // creating the object to validate the input fields
  const requiredBody = z.object({
    username: z.string().min(3).max(100).email(),
    password: z.string().min(6).max(100),
    name: z.string().min(3).max(100),
  });

  // checking the input field using validation
  const parseWithSuccess = requiredBody.safeParse(req.body);

  // throw an error if inputs are not valid
  if (!parseWithSuccess.success) {
    res.status(401).json({
      message: `Invalid input format`,
      error : parseWithSuccess.error
    });
    return;
  }

  let errorOccurred = false;
  try {
    // conversion of password in hash_password
    const hashPassword = await bcrypt.hash(password, 5);

    await userModel.create({
      username: username,
      password: hashPassword,
      name: name,
    });
  } catch (error) {
    res.status(403).json({
      message: `user already exist`,
    });
    errorOccurred = true;
  }

  if (!errorOccurred) {
    res.status(200).json({
      message: `User registered successfully`,
    });
  }
});

// user login route
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const response = await userModel.findOne({
    username: username,
  });

  if (!response) {
    res.status(403).json({
      message: `User not exist`,
    });
  }

  console.log(response);

  const passwordMatch = await bcrypt.compare(password, response.password);

  if (passwordMatch) {
    const token = jwt.sign({ id: response._id }, JWT_SECRET);
    res.status(200).json({
      token: `${token}`,
      message: `user login successfully`,
    });
  } else {
    res.status(403).json({
      message: `username and password are not matched`,
    });
  }
});

// create todo route
app.post("/todo", auth, async (req, res) => {
  const description = req.body.description;
  const status = req.body.status;
  const response = await todoModel.insertOne({
    description: description,
    status: status,
    userId: req.userId,
  });

  if (response) {
    res.status(200).json({
      message: "todo inserted successfully",
    });
  } else {
    res.status(500).json({
      message: `There is some error from our side we can't insert todo now`,
    });
  }
});

// fetch todo route
app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;
  const todoData = await todoModel.find({ userId });

  if (todoData.length > 0) {
    return res.status(200).json({ all_todo: todoData });
  } else {
    res.status(500).json({
      message: `todo not found`,
    });
  }
});

// running server
app.listen(PORT, (err, res) => {
  console.log("Sever is running on PORT 3000");
});
