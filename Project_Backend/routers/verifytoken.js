const jwt = require('jsonwebtoken');

module.exports.verifytoken = ((req, res, next) => {
    const token = req.headers.token;
    // console.log(token)
    if (!token) return res.status(401).json("Access Denied!");
    
    jwt.verify(token, 'my', (err, user)=>{
        if(err) return res.status(403).json("Token is not valid");
        req.user = user;
        next();
    });
});