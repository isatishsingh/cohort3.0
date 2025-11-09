let reqCounter = 0;

export function requestCounter(req,res,next){
    reqCounter++;
    req.reqCounter = reqCounter;
    console.log("6 =>",reqCounter);
    next();
}

export function getReqCounter(){
    return reqCounter;
}