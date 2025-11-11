const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/sum", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  res.status(200).json({
    message: `sum of ${a} and ${b} is ${a + b}`,
  });
});

app.listen(3000, (err, res) => {
  if (err) {
    console.log(`error is ${err}`);
  } else {
    console.log(`SERVER is running on PORT 3000`);
  }
});
