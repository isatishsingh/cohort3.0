import { Router } from "express";
import { checkCourseCred } from "../middleware/credential-checker.js";
import { clientLoginAuth } from "../middleware/client-auth.js";
import { course, purchase } from "../db.js";

const CourseRouter = Router();

CourseRouter.get("/view-All-courses", clientLoginAuth, async (req, res) => {
  const courses = await course.find({});

  if (courses.length > 0) {
    res.status(200).json({
      message: "courses fetched successfully",
      courses,
    });
  } else {
    res.status(200).json({
      message: "no courses found currently, we will reach you soon!",
    });
  }
});

CourseRouter.post(
  "/buy-course",
  clientLoginAuth,
  checkCourseCred,
  async (req, res) => {
    try {
      const userID = req.userID;
      const { courseID } = req.query;
      // fetching all purchased courses of a user from purchase collection
      const courses = await purchase.findOne({ userID });
      // checking if user has already have this course or not in his purchased list
      const alreadyPurchased = courses && courses.courseIDs.length ? courses.courseIDs.find(
              (item) => item.toString() === courseID.toString()
            ): null;
      
      if (alreadyPurchased) {
        return res.status(202).json({
          message:
            "You already have this course so no need to purchase it again",
        });
      }
      const response = await course.findById(courseID);

      if (!response) {
        return res.status(404).json({
          message: "no course found with this id",
        });
      }

      await purchase.updateOne(
        { userID },
        { $addToSet: { courseIDs: courseID } },
        { upsert: true }
      );
      res.status(200).json({
        message: "Congratulation You've successfully purchased this course",
      });
    } catch (error) {
      res.status(404).json({
        message: "cannot purchase course try again",
      });
    }
  }
);

CourseRouter.get("/purchased-courses", clientLoginAuth, async (req, res) => {
  const userID = req.userID;
  const purchasedCourses = await purchase.findOne({ userID });
  if (!purchasedCourses || purchasedCourses.length == 0) {
    return res.status(200).json({
      message: "no course found with this user id",
    });
  }

  const { courseIDs } = purchasedCourses;

  // this will fetch all the courses which are present in the
  // course table whose ids are present in the courseIDs array in user purchase table
  const courses = await course.find({ _id: { $in: courseIDs } });

  if(courseIDs.length && courses.length === 0){
    return res.status(500).json({
      message: "Internal server error, please try after sometime"
    })
  }
  if (!courses || courses.length == 0) {
    return res.status(200).json({
      message: "This course is not available currently you can contact to admin",
    });
  }

  res.status(200).json({
    messages: "courses fetched successfully",
    courses,
  });
});

export { CourseRouter };
