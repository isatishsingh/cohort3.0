import "../loadEnv.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import { CourseRouter } from "./routes/course.js";
import { AdminRouter } from "./routes/admin.js";
const PORT = process.env.PORT;
const URI = process.env.MONGO_DB_CONNECTION_STRING;

// mongoose.connect(URI);

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user/", UserRouter);
app.use("/course/", CourseRouter);
app.use("/admin/", AdminRouter);

async function main() {
  await mongoose.connect(URI);
  app.listen(PORT);
  console.log(`Server is Running on PORT ${PORT}`);
}

main();
// p5.js-web-editor
