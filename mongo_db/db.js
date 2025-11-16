import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const Int32 = mongoose.Int32;

// schema or structure of my database
// user schema
const users = new Schema({
    username : String,
    password : String,
    name : String,
});

// todo schema
const todo  = new Schema({
    description : String,
    status : Boolean,
    userId : ObjectId,
});

// model or method which help to specifies on which table data has to store
export const userModel = mongoose.model('users', users);
export const todoModel = mongoose.model('todos', todo);