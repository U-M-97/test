const mongoose = require("mongoose")
const DB = process.env.DB

async function dbConnection () {
    await mongoose.connect(DB, {
        useNewUrlParser: true
    }).then(()=>{
        console.log("Connection Successfull")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = dbConnection