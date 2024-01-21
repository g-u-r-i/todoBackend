const mongodb = require('mongoose')
const signupSchema=mongodb.Schema({
    name:{
        type:String,
        required:true
    },email:{
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
module.exports=mongodb.model("signUp",signupSchema)