const jwt = require('jsonwebtoken');

// Middelware function used to validate the JWT associated with the req
const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = user
        next();
    } catch(err){
        return res.sendStatus(403);
    }
};

module.exports = cookieJwtAuth;