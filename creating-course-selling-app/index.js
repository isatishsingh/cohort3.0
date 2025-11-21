import "../loadEnv.js";
// import bcrypt from "bcrypt";
import express from "express";
// import jwt from "jsonwebtoken";
import cors from "cors";
import mongoose from "mongoose";
// import { admin, course, purchase, user } from "./db.js";
// import {
//   checkCourseCred,
//   checkCreateCourseCred,
//   checkCredential,
//   checkLoginCred,
// } from "./middleware/credential-checker.js";
// import { adminLoginAuth } from "./middleware/admin-auth.js";
// import { clientLoginAuth } from "./middleware/client-auth.js";
import {UserRouter} from "./routes/user.js";
import {CourseRouter} from "./routes/course.js";
import {AdminRouter} from "./routes/admin.js";
const PORT = process.env.PORT;
const URI = process.env.MONGO_DB_CONNECTION_STRING;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(URI);

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user/",UserRouter);
app.use("/course/",CourseRouter);
app.use("/admin/",AdminRouter);

// app.post("/signup", checkCredential, async (req, res) => {
//   try {
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const email = req.body.email;
//     const password = await bcrypt.hash(req.body.password, 5);

//     await user.create({
//       firstname,
//       lastname,
//       email,
//       password,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: "This email is already in use",
//     });
//   }

//   return res.status(200).json({
//     message: "user registered successfully",
//   });
// });

// app.post("/login", checkLoginCred, async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const response = await user.findOne({
//     email,
//   });

//   if (!response) {
//     return res.status(403).json({
//       message: "User not exist",
//     });
//   }

//   const passwordMatch = await bcrypt.compare(password, response.password);

//   if (passwordMatch) {
//     const token = jwt.sign({ id: response._id }, JWT_SECRET);

//     res.status(200).json({
//       token: `${token}`,
//       message: "user logged in successfully",
//     });
//   } else {
//     res.status(403).json({
//       message: "Email and password are not matched",
//     });
//   }
// });

// app.get("/view-All-courses", clientLoginAuth, async (req, res) => {
//   const courses = await course.find({});

//   if (courses.length > 0) {
//     res.status(200).json({
//       message: "courses fetched successfully",
//       courses,
//     });
//   } else {
//     res.status(200).json({
//       message: "no courses found currently, we will reach you soon!",
//     });
//   }
// });

// app.post("/buy-course", clientLoginAuth, checkCourseCred, async (req, res) => {
//   try {
//     const userID = req.userID;
//     const courseID = req.query.courseID;

//     const response = await course.findOne({ courseID });

//     if (!response) {
//       return res.status(404).json({
//         message: "no course found with this id",
//       });
//     }

//     await purchase.create({
//       userID,
//       courseID,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: "cannot purchase course try again",
//     });
//   }
// });

// app.get("/purchased-courses", clientLoginAuth, async (req, res) => {
//   const userID = req.userID;

//   const purchasedCourses = await purchase.find({ userID });
//   console.log("125 =>", purchasedCourses);
//   if (purchasedCourses.length == 0) {
//     return res.status(404).json({
//       message: "no course found with this user id",
//     });
//   }

//   const courseIDs = purchasedCourses.map((item) => item.courseID);

//   const courses = await course.find({ _id: { $in: courseIDs } });

//   if (courses.length == 0) {
//     return res.status(200).json({
//       message: "there is some error from our server",
//     });
//   }

//   res.status(200).json({
//     messages: "courses fetched successfully",
//     courses,
//   });
// });

// // admin section
// app.post("/admin-signup", checkCredential, async (req, res) => {
//   try {
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const email = req.body.email;
//     const password = await bcrypt.hash(req.body.password, 5);

//     await admin.create({
//       firstname,
//       lastname,
//       email,
//       password,
//     });
//     console.log("161");
//   } catch (error) {
//     return res.status(404).json({
//       message: "This email is already in use",
//       error: error,
//     });
//   }

//   return res.status(200).json({
//     message: "admin registered successfully",
//   });
// });

// app.post("/admin-login", checkLoginCred, async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const response = await admin.findOne({
//     email,
//   });

//   if (!response) {
//     return res.status(403).json({
//       message: "User not exist",
//     });
//   }

//   const passwordMatch = await bcrypt.compare(password, response.password);

//   if (passwordMatch) {
//     const adminToken = jwt.sign({ id: response._id }, JWT_SECRET);

//     return res.status(200).json({
//       adminToken: `${adminToken}`,
//       message: "user logged in successfully",
//     });
//   } else {
//     return res.status(403).json({
//       message: "Email and password are not matched",
//     });
//   }
// });

// app.post(
//   "/create-course",
//   adminLoginAuth,
//   checkCreateCourseCred,
//   async (req, res) => {
//     try {
//       const title = req.body.title;
//       const description = req.body.description;
//       const price = req.body.price;
//       const photourl = req.body.photourl;
//       const creatorID = req.adminID;

//       await course.create({
//         title,
//         description,
//         price,
//         photourl,
//         creatorID,
//       });
//     } catch (error) {
//       return res.status(401).json({
//         message: "course is not created successfully",
//       });
//     }

//     return res.status(200).json({
//       message: "new course created successfully",
//     });
//   }
// );

// app.put("/update-course", adminLoginAuth, checkCourseCred, async (req, res) => {
//   try {
//     const { title, description, photourl, price } = req.body;
//     const { courseID } = req.query;
//     const fetchedCourse = await course.findById(courseID);
//     if (fetchedCourse.length === 0) {
//       return res.status(400).json({
//         message: `no course found please check courseID`,
//       });
//     }

//     if (fetchedCourse.creatorID.toString() !== req.adminID.toString()) {
//       return res.status(400).json({
//         message: `Sorry you don't have any access for this course`,
//       });
//     }

//     let updateFields = {};

//     if (title) updateFields.title = title;
//     if (description) updateFields.description = description;
//     if (photourl) updateFields.photourl = photourl;
//     if (price) updateFields.price = price;

//     await course.updateOne({ _id: courseID }, { $set: updateFields });
//   } catch (error) {
//     return res.status(400).json({
//       message: "course update unsuccessful",
//     });
//   }

//   return res.status(200).json({
//     message: "course updated successfully",
//   });
// });

// app.delete(
//   "/delete-course",
//   adminLoginAuth,
//   checkCourseCred,
//   async (req, res) => {
//     try {
//       const { courseID } = req.query;
//       console.log(courseID);
//       await course.findByIdAndDelete(courseID);

//       return res.status(200).json({
//         message: "course deleted successfully",
//       });
//     } catch (error) {
//       return res.status(400).json({
//         message: "course deletion is unsuccessful",
//       });
//     }
//   }
// );

app.listen(PORT, (req, res) => {
  console.log(`Server is Running on PORT ${PORT}`);
});
