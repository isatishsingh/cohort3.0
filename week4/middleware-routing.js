const express = require("express");
const app = express();

// there are two way to call the middleware either you can use the app.use method to call it
// or else you can write the name of the middleware before the arrow function and after the route handler
// app.use(checkTicketType);
// but when you use app.use it will apply on all the routes which are below to it.

// middleware which check the user ticket type
function checkTicketType(req, res, next) {
  const ticketType = req.query.ticket;
  const ride = req.url.split("?")[0].split("/")[1];
  if (ticketType == "free") {
    next();
  } else {
    res.status(404).send(`You don't have any access to enjoy the ${ride}`);
  }
}

// middleware which check the age of the user
function checkAge(req, res, next) {
  const userAge = req.query.age;
  const ride = req.url.split("?")[0].split("/")[1];
  if (userAge >= 18 && userAge < 60) {
    next();
  } else {
    res.status(404).send(`You're not eligible for the ${ride}`);
  }
}

// ride1
app.get("/ride1", checkTicketType, checkAge, (req, res) => {
  res.status(200).send(`enjoy the ${req.url.split("?")[0].split("/")[1]}`);
});

// ride2
app.get("/ride2", checkTicketType, checkAge, (req, res) => {
  res.status(200).send(`enjoy the ${req.url.split("?")[0].split("/")[1]}`);
});

// ride3
app.get("/ride3", checkTicketType, checkAge, (req, res) => {
  res.status(200).send(`enjoy the ${req.url.split("?")[0].split("/")[1]}`);
});

// running port of the server
app.listen(3000, () => {
  console.log("Running on route 3000");
});
