const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    googleId: {
        type: Number
    },
    facebookId: {
        type: Number
    },
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/456/456212.png"
    },
    password: {
        type: String
    },
    plab2Date: {
        type: String
    },
    prevPlab2Attempts: {
        type: String
    },
    phone: {
        type: String
    },
    token: {
        type: String
    },
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    amountPaid: {
        type: Number,
        default: 0
    },
    review: {
        type: String
    },
    rating: {
        type: Number
    }
}, { timestamps: true }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
module.exports = User