import "../loadEnv.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {UserRouter} from "./routes/user.js";
import {CourseRouter} from "./routes/course.js";
import {AdminRouter} from "./routes/admin.js";
const PORT = process.env.PORT;
const URI = process.env.MONGO_DB_CONNECTION_STRING;

mongoose.connect(URI);

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user/",UserRouter);
app.use("/course/",CourseRouter);
app.use("/admin/",AdminRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is Running on PORT ${PORT}`);
});

// p5.js-web-editor