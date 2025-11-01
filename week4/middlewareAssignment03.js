const express = require("express");
const app = express();

app.use(errorMiddleware);
let age = 15;
let errorCount = 0;
function errorMiddleware(req,res,next){
    try{
        if(age < 18){
            throw new error;
        }else{
            next();
        }
    }catch(err){
        errorCount++;
        res.status(404).send(`Thode se bade ho jao, total error count is ${errorCount}`);
    }
}

app.get('/simpleGet',(req,res)=>{
    res.status(200).send("get h0 gya");
})

app.post('/simplePost',(req,res)=>{
    res.status(200).send("post ho gya");
})

app.put('/simplePut',(req,res)=>{
    res.status(200).send("put ho gya");
})

app.delete('simpleDelete',(req,res)=>{
    res.status(200).send("delete ho gya");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
