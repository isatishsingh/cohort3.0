const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { auth } = require("../middleware/auth.js");
const JWT_SECRET = "THIS_IS_FOR_TODO_APP";
const cors = require("cors");
const users = "../userData.json";
const todoData = "../todosData.json";

const app = express();

function loadTodoData() {
  return JSON.parse(fs.readFileSync(todoData, "utf-8"));
}

function writeTodoData(newTodo) {
  fs.writeFileSync(todoData, JSON.stringify(newTodo, null, 2));
}

function loadUserData() {
  return JSON.parse(fs.readFileSync(users, "utf-8"));
}

function writeUserData(newData) {
  fs.writeFileSync(users, JSON.stringify(newData, null, 2));
}

app.use(express.json());
app.use(cors());

app.post("/signin", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    return res.status(400).json({
      invalidInput: `Please Enter your details`,
    });
  }

  const userData = loadUserData();
  const foundUser = userData.find(
    (user) => user.userName === userName && user.password === password
  );

  if (!foundUser) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const token = jwt.sign({ userName: userName }, JWT_SECRET);
  res.status(200).json({
    message: `${token}`,
  });
});

app.post("/signup", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    return res.status(400).json({
      invalidInput: `Please Enter your details properly`,
    });
  }

  const userData = loadUserData();
  const checkUser = userData.find((user) => user.userName === userName);
  if (checkUser) {
    return res.status(400).json({
      message: `This Username is already taken`,
    });
  }

  userData.push({
    userName: userName,
    password: password,
  });

  writeUserData(userData);
  res.status(200).json({
    message: `user registered successfully`,
  });
});

app.post("/insert-todo", auth, (req, res) => {
  const todoValue = req.body.todoValue;
  const todoStatus = req.body.todoStatus;
  const userName = req.userName;

  if (!todoValue || !todoStatus) {
    return res.status(400).json({
      invalidInput: `Please fill the todo details properly`,
    });
  }
  const todos = loadTodoData();
  const foundTodoIndex = todos.findIndex((todo) => todo.userName === userName);
  if (foundTodoIndex >= 0) {
    todos[foundTodoIndex].todos.push({
      todoValue: todoValue,
      todoStatus: todoStatus,
    });
  } else {
    const newTodo = {
      userName: userName,
      todos: [
        {
          todoValue: todoValue,
          todoStatus: todoStatus,
        },
      ],
    };
    todos.push(newTodo);
  }

  writeTodoData(todos);

  res.status(200).json({
    message: `Todo inserted successfully`,
  });
});

app.get("/get-todo", auth, (req, res) => {
  const todos = loadTodoData();
  try {
    const userName = req.userName;
    const foundTodo = todos.find((todo) => todo.userName === userName);
    res.status(200).json({
      todos: foundTodo ? foundTodo : [],
    });
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
});

app.listen(3000, (err, res) => {
  console.log("Server is running on PORT 3000");
});
