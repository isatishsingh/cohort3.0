const express = require('express');
const app = express();

let getReqCount = 0;
let postReqCount = 0;
let putReqCount = 0;
let deleteReqCount = 0;
let totalReqCount = 0;
app.use(reqCounter);

function reqCounter(req,res,next){
    const urlType = req.method;
    if(urlType == "GET") getReqCount++;
    if(urlType == "POST") postReqCount++;
    if(urlType == "PUT") putReqCount++;
    if(urlType == "DELETE") deleteReqCount++;
    totalReqCount = getReqCount + postReqCount + putReqCount + deleteReqCount;
    next();
}

app.get('/user', (req,res) =>{
    res.status(200).send(`Total count for get request are ${getReqCount} and total request counts are ${totalReqCount}`);
});

app.post('/user', (req,res) =>{
    res.status(200).send(`Total count for get request are ${postReqCount} and total request counts are ${totalReqCount}`);
});

app.put('/user', (req,res) =>{
    res.status(200).send(`Total count for get request are ${putReqCount} and total request counts are ${totalReqCount}`);
});

app.delete('/user', (req,res) =>{
    res.status(200).send(`Total count for get request are ${deleteReqCount} and total request counts are ${totalReqCount}`);
});

app.listen(3000, ()=>{
    console.log("Running on port 3000");
})