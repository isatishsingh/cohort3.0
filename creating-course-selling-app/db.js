import mongoose from "mongoose";
const Schema = mongoose.Schema;
const objectId = mongoose.ObjectId;

const USER_SCHEMA = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ADMIN_SCHEMA = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const COURSE_SCHEMA = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photourl: { type: String, requires: true },
  creatorID: { type: objectId, required: true, ref: "admin" },
});

const PURCHASE_COURSE_SCHEMA = new Schema({
  userID: { type: objectId, required: true },
  courseIDs: [{ type: objectId, required: true }],
});

export const user = mongoose.model("user", USER_SCHEMA);
export const admin = mongoose.model("admin", ADMIN_SCHEMA);
export const course = mongoose.model("course", COURSE_SCHEMA);
export const purchase = mongoose.model("purchase", PURCHASE_COURSE_SCHEMA);
