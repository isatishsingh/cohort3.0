import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  checkCourseCred,
  checkCreateCourseCred,
  checkCredential,
  checkLoginCred,
} from "../middleware/credential-checker.js";
import { admin, course } from "../db.js";
import { adminLoginAuth } from "../middleware/admin-auth.js";
const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

const AdminRouter = Router();

AdminRouter.post("/admin-signup", checkCredential, async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 5);

    await admin.create({
      firstname,
      lastname,
      email,
      password,
    });
  } catch (error) {
    return res.status(404).json({
      message: "This email is already in use",
      error: error,
    });
  }

  return res.status(200).json({
    message: "admin registered successfully",
  });
});

AdminRouter.post("/admin-login", checkLoginCred, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await admin.findOne({
    email,
  });

  if (!response) {
    return res.status(403).json({
      message: "User not exist",
    });
  }

  const passwordMatch = await bcrypt.compare(password, response.password);

  if (passwordMatch) {
    const adminToken = jwt.sign({ id: response._id }, JWT_SECRET);

    return res.status(200).json({
      adminToken: `${adminToken}`,
      message: "admin logged in successfully",
    });
  } else {
    return res.status(403).json({
      message: "Email and password are not matched",
    });
  }
});

AdminRouter.post(
  "/create-course",
  adminLoginAuth,
  checkCreateCourseCred,
  async (req, res) => {
    try {
      const title = req.body.title;
      const description = req.body.description;
      const price = req.body.price;
      const photourl = req.body.photourl;
      const creatorID = req.adminID;

      await course.create({
        title,
        description,
        price,
        photourl,
        creatorID,
      });
    } catch (error) {
      return res.status(401).json({
        message: "course is not created successfully",
      });
    }

    return res.status(200).json({
      message: "new course created successfully",
    });
  }
);

AdminRouter.put(
  "/update-course",
  adminLoginAuth,
  checkCourseCred,
  async (req, res) => {
    try {
      const { title, description, photourl, price } = req.body;
      const { courseID } = req.query;
      const fetchedCourse = await course.findById(courseID);
      if (fetchedCourse.length === 0) {
        return res.status(400).json({
          message: `no course found please check courseID`,
        });
      }

      if (fetchedCourse.creatorID.toString() !== req.adminID.toString()) {
        return res.status(400).json({
          message: `Sorry you don't have any access for this course`,
        });
      }

      let updateFields = {};

      if (title) updateFields.title = title;
      if (description) updateFields.description = description;
      if (photourl) updateFields.photourl = photourl;
      if (price) updateFields.price = price;

      await course.updateOne({ _id: courseID }, { $set: updateFields });
    } catch (error) {
      return res.status(400).json({
        message: "course update unsuccessful",
      });
    }

    return res.status(200).json({
      message: "course updated successfully",
    });
  }
);

AdminRouter.delete(
  "/delete-course",
  adminLoginAuth,
  checkCourseCred,
  async (req, res) => {
    try {
      const { courseID } = req.query;
      const fetchedCourse = await course.findById(courseID);
      if (fetchedCourse.length === 0) {
        return res.status(400).json({
          message: `no course found please check courseID`,
        });
      }

      if (fetchedCourse.creatorID.toString() !== req.adminID.toString()) {
        return res.status(400).json({
          message: `Sorry you don't have any access for this course`,
        });
      }
      await course.findByIdAndDelete(courseID);

      return res.status(200).json({
        message: "course deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        message: "course deletion was unsuccessful",
      });
    }
  }
);

export { AdminRouter };
