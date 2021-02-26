const mongoose = require('mongoose')

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    first_name: String,
    last_name: String,
    email: String,
    mobile: {
        type: String,
        // unique: true,
        required: true
    },

    dob: Date,
})

module.exports = mongoose.model('User', User);