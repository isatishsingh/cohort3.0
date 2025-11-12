const express = require("express");
const { generateToken } = require("./simpleToken");
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = "HELP_TO_IT_SECRET";

app.use(express.json());

const users = [];
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

    const token = jwt.sign({userName : userName},JWT_SECRET); // using jwt
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

app.get('/me', (req,res) =>{
    const token = req.headers.token;
    const decryptedInformation = jwt.verify(token, JWT_SECRET);

    const foundUser = users.find(user => user.userName === decryptedInformation.userName);

    if(foundUser){
        res.status(200).json({
            message : `welcome ${foundUser.userName} and your password is ${foundUser.password}`,
        });
    }else{
        res.status(404).json({
            message : `user not found`,
        });
    }
})

app.listen(3000, (err, res) => {
  console.log(`server is running on PORT 3000`);
});
