import "../loadEnv.js";
import express from "express";
import jwt from "jsonwebtoken";
import { generateToken } from "./tokenGenerator.js";
import { checkUser } from "./middleware/auth.js";
import cors from "cors";

const app = express();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

export const users = [];

app.post("/signup", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    return res.status(404).json({
      invalidInput: `Enter proper userName and password`,
    });
  }

  if (users.find((user) => user.userName === userName)) {
    res.status(400).json({
      error: `user is already registered`,
    });
    return;
  }

  users.push({
    userName,
    password,
  });

  res.status(200).json({
    message: `user is registered successfully`,
  });
  console.log("26 =>", users);
});

app.post("/signin", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    return res.status(404).json({
      invalidInput: `Enter  userName and password`,
    });
  }

  const fetchedUser = users.find(
    (user) => user.userName == userName && user.password == password
  );

  if (fetchedUser) {
    // const token = generateToken(); // creating our own token
    // fetchedUser.token = token; // writing the token on object, old practice

    const token = jwt.sign({ userName: userName }, JWT_SECRET); // using jwt
    res.status(200).json({
      message: `${token}`,
    });
  } else {
    res.status(404).json({
      error: `Please enter valid User Name and Password`,
    });
  }
  console.log("26 =>", users);
});


app.get("/me", checkUser, (req, res) => {
  const foundUser = users.find((user) => user.userName === req.userName);

  if (foundUser) {
    res.status(200).json({
      userName: foundUser.userName,
      password: foundUser.password,
    });
  } else {
    res.status(404).json({
      message: `No data found found for this user`,
    });
  }
});

app.get("/logout", checkUser, (req, res) => {
  const foundUserIndex = users.findIndex((user) => user.userName === req.userName);

  if (foundUserIndex >= 0) {
    users.splice(foundUserIndex, 1);
    res.status(200).json({
      message : `user deleted successfully`,
    });
  } else {
    res.status(404).json({
      message: `No data found found for this user`,
    });
  }
});

app.listen(PORT, (err, res) => {
  console.log(`server is running on PORT ${PORT}`);
});
