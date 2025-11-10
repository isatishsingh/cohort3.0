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

export function deleteData(req,res){
    const email = req.body.email;
    const userData = loadData();
    
    let index = userData.findIndex(item => item.email == email);
    userData.splice(index,1);
    writeData(userData);

    res.status(200).json({
        message : "Data deleted successfully",
    })
}

