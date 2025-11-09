export function denominator(req,res,next){
    if(0 == parseInt(req.query.b)){
        return res.json({
            message : "denominator cannot be 0, enter valid value for the denominator",
        })
    }
    next();
}
