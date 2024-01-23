const mongodb = require('mongoose')
const loginSchema = mongodb.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiry: {
        type: String,
    }

})
module.exports = mongodb.model("login", loginSchema)