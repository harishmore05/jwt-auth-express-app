const User = require('../models/User.model')
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth.middleware')

exports.register = (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username or Password shouldn't be empty.."
        });
    }

    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        dob: req.body.dob,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
    })

    user.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log("Error: ",err)
        res.status(500).send({
            message: err.message || "Something went wrong while creating new user.."
        })
    })
}

exports.login = (req,res) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if(!user) {
            res.status(400).send({
                message: "The user with username "+req.body.username+" does not exist.."
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({
                message: "Invalid password"
            })
        }
        const token = authMiddleware.generateToken({ username: req.body.username })
        console.log(user)
        res.send({
            message: "Login successfull..",
            token: token
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Something went wrong"
        })
    })
}

exports.authenticate = (req, res) => {
    res.send({
        message: "Authenticated User",
        user: req.user
    })
}

exports.users = (req, res) => {
    User.find().limit(20)
    .then(users => {
        if(!users) {
            res.status(400).send({
                message: "No users are present in database.."
            })
        }
        res.status(200).send({
            users: users
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err || "Something went wrong"
        })
    })
}