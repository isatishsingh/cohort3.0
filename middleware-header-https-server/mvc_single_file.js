import express from "express";
const app = express();

let reqCounter = 0;

// request counter for each route
// middleware always should same, it need to have req, res and next parameter
// middleware handler function has access to change the req variable
function requestCounter(req, res, next) {
  reqCounter++;
  req.name = "Satish Singh"; // we can also assign the new value to the req object.
  console.log(`Total number of request are made yet ${reqCounter}`);
  next();
}

// logging the time, method and url 
function logRequest(req, res, next) {
  const date = new Date();
  console.log(req.method);
  console.log(`http://localhos:3000/${req.url}`);
  console.log(date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
  next();
}

// denominator checker function
function denominatorChecker(req, res, next) {
  // we can stop the req res cycle if middleware found verification issues
  if (0 == parseInt(req.query.b))
    return res.json({
      message: "Denominator cannot be 0, enter valid value for denominator",
    });

  next();
}

app.get("/admin", (req, res) => {
  res.json({
    message: `Total number of request count is ${reqCounter}`,
  });
});

// this app.use method will apply the requestCounter middleware on all the routes that are
// written below of this line
// and the route which are written above the app.use will not use the requestCounter middleware.
app.use(requestCounter, logRequest);

// router for sum calculation
app.get("/sum", (req, res) => {
  console.log(req.query.a);
  console.log(req.name);
  let a = +req.query.a;
  let b = +req.query.b;
  let result = a + b;
  res.json({
    answer: result,
  });
});

// router for subtraction calculation
app.get("/sub/:a/:b", (req, res) => {
  let a = parseInt(req.params.a);
  let b = parseInt(req.params.b);
  let result = a - b;
  res.json({
    answer: result,
  });
});

// router for multiplication calculation
app.get("/multiply", (req, res) => {
  let a = +req.query.a;
  let b = +req.query.b;
  let result = a * b;
  res.json({
    answer: result,
  });
});

// router for division calculation
app.get("/divide", denominatorChecker, (req, res) => {
  let a = +req.query.a;
  let b = +req.query.b;
  let result = a / b;
  res.json({
    answer: result,
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
