import z from "zod";

export const checkCredential = async (req, res, next) => {
  const requiredBody = z.object({
    firstname: z.string().trim().min(3).max(50),
    lastname: z.string().trim().min(3).max(50),
    email: z.string().trim().email(),
    password: z.string().trim().min(6).max(30),
  });

  const parseWithSuccess = requiredBody.safeParse(req.body);

  if (!parseWithSuccess.success) {
    return res.status(401).json({
      message: "Please enter details properly",
      error: parseWithSuccess.error,
    });
  } else {
    next();
  }
};

export const checkLoginCred = async (req, res, next) => {
  const requiredBody = z.object({
    email: z.string().trim().email(),
    password: z.string().trim().min(3).max(30),
  });

  const parseWithSuccess = requiredBody.safeParse(req.body);

  if (!parseWithSuccess.success) {
    return res.status(401).json({
      message: "Please enter details properly",
      error: parseWithSuccess.error,
    });
  } else {
    next();
  }
};

export const checkCourseCred = async (req, res, next) => {
  const requiredBody = z.object({
    courseID: z.string().trim(),
  });

  const parseWithSuccess = requiredBody.safeParse(req.query);

  if (!parseWithSuccess.success) {
    return res.status(401).json({
      message: "Please enter the valid courseID",
      error: parseWithSuccess.error,
    });
  } else {
    next();
  }
};

export const checkCreateCourseCred = async (req, res, next) => {
  const requiredBody = z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(50).max(1000),
    price: z.number(),
    photourl: z.string().url()
  });

  const parseWithSuccess = requiredBody.safeParse(req.body);

  if (!parseWithSuccess.success) {
    return res.status(401).json({
      message: "Please enter the valid course details",
      error: parseWithSuccess.error,
    });
  } else {
    next();
  }
};
