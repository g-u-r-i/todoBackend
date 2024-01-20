const mongodb = require('mongoose')
const connectDb = async () => {
    try {
await mongodb.connect(process.env.DB_URI)
console.log("connect db")
    } catch (err) {
        console.log("Error while connecting"+ err.message)
    }
}
module.exports = connectDb