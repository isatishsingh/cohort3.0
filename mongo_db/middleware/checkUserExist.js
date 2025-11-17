import { userModel } from "../db.js";

export const isExist = async (req, res, next) => {
  const username = req.body.username;

  const response = await userModel.findOne({ username: username });
  if (response) {
    res.status(403).json({
      message: `this username is already occupied`,
    });
    return;
  } else {
    next();
  }
};
