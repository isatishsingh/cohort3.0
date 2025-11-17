import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import { userModel, todoModel } from "./db.js";
import { auth } from "./middleware/auth.js";
import { isExist } from "./middleware/checkUserExist.js";
const JWT_SECRET = "THIS_HELPS_TO_KEEP_IT_SECRET";

// connecting server
mongoose.connect(
  `mongodb+srv://zaplearn:wMtnEhmCj6O4k7EP@cluster0.qng6m3q.mongodb.net/todo-app-database`
);
const app = express();

app.use(express.json());
app.use(cors());

// user signup route
app.post("/signup", isExist,  async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  await userModel.create({
    username: username,
    password: password,
    name: name,
  });

  res.status(200).json({
    message: `User registered successfully`,
  });
});

// user login route
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const response = await userModel.findOne({
    username: username,
    password: password,
  });

  if (response) {
    const token = jwt.sign({ id: response._id }, JWT_SECRET);
    res.status(200).json({
      token: `${token}`,
      message: `user login successfully`,
    });
  } else {
    res.status(403).json({
      message: `No user found`,
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
app.listen(3000, (err, res) => {
  console.log("Sever is running on PORT 3000");
});
