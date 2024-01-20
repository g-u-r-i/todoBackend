const mongodb = require('mongoose')
const loginSchema=mongodb.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
    
})
module.exports=mongodb.model("login",loginSchema)