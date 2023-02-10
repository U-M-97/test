import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        users: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
        },
        logout: (state) => {
            state.currentUser = null
        },
        userReviews: (state, action) => {
            state.users = action.payload
        }
    }
})

export const { loginSuccess, logout, userReviews } = userSlice.actions
export default userSlice.reducer