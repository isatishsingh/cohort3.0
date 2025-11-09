const express = require("express");
const app = express();

numberOfRequestFormUser = [];
app.use(rateLimiter);

function rateLimiter(req, res, next) {
  const userId = req.query.userId;
  let userAt = numberOfRequestFormUser.findIndex(item => item.userId == userId);
  let currentTime = Date.now();

  if (userAt == -1) {
    numberOfRequestFormUser.push({
    userId: userId,
    count: 1,
    date: Date.now(),
    });
    next();
  } else if (numberOfRequestFormUser[userAt].count > 5 && ((currentTime - numberOfRequestFormUser[userAt].date) / 1000) < 1 ) {
    numberOfRequestFormUser.splice(userAt, 1);
    res.status(404).send("You've hit you're rate limit, you can send 5 request in 1 sec");
  } else {
    numberOfRequestFormUser[userAt].count++;
    numberOfRequestFormUser[userAt].date = Date.now();
    next();
  }
}

function findPos(req) {
  return numberOfRequestFormUser.findIndex((item) => item.userId === req.query.userId);
}

app.get("/user", (req, res) => {
  res
    .status(200)
    .send(
      `get comes successfully ${numberOfRequestFormUser[findPos(req)].count}`
    );
});

app.post("/user", (req, res) => {
  res
    .status(200)
    .send(
      `post comes successfully ${numberOfRequestFormUser[findPos(req)].count}`
    );
});

app.put("/user", (req, res) => {
  res
    .status(200)
    .send(
      `put comes successfully ${numberOfRequestFormUser[findPos(req)].count}`
    );
});

app.delete("/user", (req, res) => {
  res
    .status(200)
    .send(
      `delete comes successfully ${numberOfRequestFormUser[findPos(req)].count}`
    );
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
