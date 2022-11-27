
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const URL = `${process.env.MONGODB_URL}`

const connectDB = ()=>{
    mongoose.connect(URL, (err)=>{
        if (err) throw err
        console.log("MongoDB is Connected")
    })
}

module.exports = connectDB