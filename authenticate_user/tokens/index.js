import "./loadEnv.js";
import express from "express";
import jwt from "jsonwebtoken";
import { generateToken } from "./tokenGenerator.js";
import { checkUser } from "./middleware/auth.js";
const app = express();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

app.use(express.json());

export const users = [];

app.post("/signup", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (users.find((user) => user.userName === userName)) {
    res.status(400).json({
      message: `user is already registered`,
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
  const fetchedUser = users.find(
    (user) => user.userName == userName && user.password == password
  );

  if (fetchedUser) {
    // const token = generateToken(); // creating our own token
    // fetchedUser.token = token; // writing the token on object, old practice

    const token = jwt.sign({ userName: userName }, JWT_SECRET); // using jwt
    res.status(200).json({
      message: `login successfully and generated token is ${token}`,
    });
  } else {
    res.status(404).json({
      message: `invalid credential`,
    });
  }
  console.log("26 =>", users);
});

app.get("/me", checkUser, (req, res) => {
  const foundUser = users.find((user) => user.userName === req.userName);

  if (foundUser) {
    res.status(200).json({
      message: `Hii there you are inside /me endpoint`,
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
