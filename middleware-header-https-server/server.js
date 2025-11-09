import express from "express";
import { requestCounter } from "./middlewares/requestCounter.js";
import { logRequest } from "./middlewares/logRequest.js";
import { denominator } from "./middlewares/denominator.js";
import { findSum } from "./routes/calculatorRoute.js";
import { findSub } from "./routes/calculatorRoute.js";
import { findMultiply } from "./routes/calculatorRoute.js";
import { findDivide } from "./routes/calculatorRoute.js";
import { admin } from "./routes/calculatorRoute.js";

const app = express();
app.get("/admin", admin);

app.use(requestCounter);
app.use(logRequest);
app.get("/sum", findSum);
app.get("/sub/:a/:b", findSub);
app.get("/multiply", findMultiply);
app.get("/divide", denominator, findDivide);

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
