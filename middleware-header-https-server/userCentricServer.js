import express from "express";
import cors from "cors"; 
import {
  registerMiddleware,
  getDataMiddleware,
  updateDataMiddleware,
  deleteDataMiddleware,
} from "./middlewares/checkFields.js";
import { register } from "./routes/register.js";
import { getDetail } from "./routes/getData.js";
import { updateDetail } from "./routes/updateData.js";
import { deleteData } from "./routes/deleteData.js";
const app = express();

app.use(cors());
app.use(express.json());
app.post("/register", registerMiddleware, register);
app.get("/getDetail", getDataMiddleware, getDetail);
app.put("/updateDetail", updateDataMiddleware, updateDetail);
app.delete("/deleteUser", deleteDataMiddleware, deleteData);

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
