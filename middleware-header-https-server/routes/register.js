import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct JSON file path
const databaseFile = path.join(__dirname, "../userDatabase.json");

function loadData(){
    return JSON.parse(fs.readFileSync(databaseFile,'utf-8'));
}

function writeData(newData){
    fs.writeFileSync(databaseFile, JSON.stringify(newData, null, 2));
}

export function register(req,res){
    const data = {
        id : req.body.id,
        name : req.body.name,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        password : req.body.password,
    }

    const userData = loadData();
    userData.push(data);
    writeData(userData);
    res.status(200).json({message : "User registered successfully"});
}