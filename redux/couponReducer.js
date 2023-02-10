import { createSlice } from "@reduxjs/toolkit"

const couponSlice = createSlice({
    name: "coupon",
    initialState: {
        coupons: null
    },
    reducers: {
        addCoupon: (state, action) => {
            state.coupons = action.payload
        },
        delCoupon: (state) => {
            state.coupons = null
        }
    }
})

export const { addCoupon, delCoupon } = couponSlice.actions
export default couponSlice.reducer