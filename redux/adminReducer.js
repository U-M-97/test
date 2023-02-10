import { createSlice } from "@reduxjs/toolkit"

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: null,
        room: null
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.admin = action.payload
        },
        logout: (state) => {
            state.admin = null
        },
        addRoom: (state, action) => {
            state.room = action.payload
        }
    }
})

export const { loginSuccess, logout, addRoom } = adminSlice.actions
export default adminSlice.reducer