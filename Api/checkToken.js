let jwt = require('jsonwebtoken');

let checkToken =  (req,res,next)=>{
    let token = req.headers['authorization'];
    if(!token)
    return res.send({
        data:{},
        error:-200 ,
        msg :'No token provided.'
    })
    try{
        const decoded = jwt.verify(token,'SECRET');
        req.user = decoded;
        next();
    }catch(e){
        res.status(200).send({ data: {}, error: -100, msg: 'Token is not valid' });
    }
}
module.exports={
    checkToken:checkToken
}
