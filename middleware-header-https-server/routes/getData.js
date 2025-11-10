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

export function getDetail(req,res){
    const email = req.query.email;
    const userData = loadData();
    
    let index = userData.findIndex(item => item.email == email);
    res.status(200).json({
        name : userData[index].name,
        email : userData[index].email,
        phoneNumber : userData[index].phoneNumber,
        password : userData[index].password,
        message : "Data fetched successfully"
    });
}

