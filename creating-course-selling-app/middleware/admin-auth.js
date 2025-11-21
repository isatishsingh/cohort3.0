import z from "zod";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET_ADMIN;

export const adminLoginAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    const requestBody = z.object({
      token: z.string().trim(),
    });

    const parseWithSuccess = requestBody.safeParse(req.headers);

    if (!parseWithSuccess.success) {
      return res.status(404).json({
        message: "Please Login First",
      });
    }
    const response = jwt.verify(token, JWT_SECRET);
    if (response) {
      req.adminID = response.id;
      next();
    }
  } catch (error) {
    return res.status(404).json({
      message: "Please login first",
    });
  }
};
