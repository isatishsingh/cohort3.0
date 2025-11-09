import express from "express";

const app = express();

app.get("/sum", (req, res) => {
  let a = +req.query.a;
  let b = +req.query.b;
  let result = a + b;
  res.json({
    answer: result,
  });
});

app.get("/sub/:a/:b", (req, res) => {
  let a = parseInt(req.params.a);
  let b = parseInt(req.params.b);
  let result = a - b;
  res.json({
    answer: result,
  });
});

app.get("/multiply", (req, res) => {
  let a = +req.query.a;
  let b = +req.query.b;
  let result = a * b;
  res.json({
    answer: result,
  });
});

app.get("/divide", (req, res) => {
  let a = +req.query.a;
  let b = +req.query.b;
  if (b == 0) {
    res.status(404).send(`b or denominator can not be 0 during division`);
    return;
  }
  let result = a / b;
  res.json({
    answer: result,
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
