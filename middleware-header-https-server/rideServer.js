import express from "express";
import { requestCounter } from "./middlewares/requestCounter.js";
import { admin } from "./routes/calculatorRoute.js";
import { checkAge } from "./middlewares/ageChecker.js";
import { checkTicketType } from "./middlewares/ticketChecker.js";
import { ride1, ride2, ride3 } from "./routes/rides.js";

const app = express();

app.get("/admin", admin);

app.use(requestCounter);
app.use(checkTicketType);
app.use(checkAge);
app.get("/ride1", ride1);
app.get("/ride2", ride2);
app.get("/ride3", ride3);

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
