const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.generateToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) {
        res.status(401).send({
            message: "Provide token"
        })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
        if(err) {
            res.status(403).send({
                message: "Token Expired"
            })
        }
        req.user = user.username
        next()
    })
}