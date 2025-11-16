import jwt from "jsonwebtoken";
const JWT_SECRET = "THIS_HELPS_TO_KEEP_IT_SECRET";

// checking user authentication
export const auth = (req, res, next) => {
  const token = req.headers.token;
  
  const response = jwt.verify(token, JWT_SECRET);
  console.log("6=>", response);
  
  if (response) {
    req.userId = response.id;
    next();
  } else {
    res.status(403).json({
      message: `Please login first`,
    });
  }
};
