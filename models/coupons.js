const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    discount: {
        type: Number
    },
    discountType: {
        type: String
    },
    discountOn: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    usersLimit: {
        type: String
    },
    status: {
        type: String
    },
    totalUses: {
        type: Number,
        default: 0
    }
}, { timestamps: true }
)

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema)
module.exports = Coupon