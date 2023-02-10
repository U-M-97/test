const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    roomTitle: {
        type: String
    },
    image: {
        type: String
    },
    roomType: {
        type: String
    },
    roomBeds: {
        type: Number
    },
    roomMembers: [
        {
            name: {
                type: String
            }, 
            gender: {
                type: String
            },
            phone: {
                type: String
            },
            country: {
                type: String
            },
            email: {
                type: String
            },
            checkIn: {
                type: Date
            },
            checkOut: {
                type: Date
            },
            bed: {
                type: String
            },
            payment: {
                type: Number
            },
            paid: {
                type: Boolean,
                default: false
            },
            bookedOn: {
                type: Date,
                default: new Date()
            }
        }
    ]

}, { timestamps: true }
)

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema)
module.exports = Room