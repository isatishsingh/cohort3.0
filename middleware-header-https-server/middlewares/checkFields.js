import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct JSON file path
const databaseFile = path.join(__dirname, "../userDatabase.json");

function loadData() {
  return JSON.parse(fs.readFileSync(databaseFile, "utf-8"));
}

function checkAllFields(name, email, phoneNumber, password) {
  if (!name || !email || !phoneNumber || !password) {
    return { error: "Please fill all the details" };
  }
}


function checkUserExist(email) {
  const userData = loadData();
  const index = userData.findIndex((item) => item.email == email);
  return index;
}

// middlewares
export function registerMiddleware(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;

  if (checkAllFields(name, email, phoneNumber, password)?.error) {
    return res.status(202).json({
      message: "Fill all the input fields",
    });
  }

  if (checkUserExist(email) != -1) {
    return res.status(203).json({
      message: "Given email is already registered",
    });
  }

  req.body.id = randomUUID();

  next();
}

export function getDataMiddleware(req, res, next) {
  const email = req.query.email;
  if (!email) {
    return res.status(202).json({
      message: "enter email in  the input fields",
    });
  }

  if (checkUserExist(email) == -1) {
    return res.status(202).json({
      message: "Given email is Not exist",
    });
  }
  next();
}

export function updateDataMiddleware(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(202).json({
      message: "Fill all the input fields",
    });
  }

  if (checkUserExist(email) == -1) {
    return res.status(202).json({
      message: "Given email is not valid for update details",
    });
  }

  next();
}

export function deleteDataMiddleware(req, res, next) {
  const email = req.body.email;

  if (checkUserExist(email) == -1) {
    return res.status(202).json({
      message: "Given email is not valid for update details",
    });
  }
  next();
}
