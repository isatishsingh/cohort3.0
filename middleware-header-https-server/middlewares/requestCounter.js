let reqCounter = 0;

export function requestCounter(req,res,next){
    reqCounter++;
    req.reqCounter = reqCounter;
    next();
}

export function getReqCounter(){
    return reqCounter;
}