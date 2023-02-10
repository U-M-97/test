import { createSlice } from "@reduxjs/toolkit"

const courseSlice = createSlice({
    name: "course",
    initialState: {
        currentCourses: null,
        selectedCourse: null
    },
    reducers: {
        addCourse: (state, action) => {
            state.currentCourses = action.payload
        },
        delCourse: (state) => {
            state.currentCourses = null
        },
        selectCourse: (state, action) => {
            state.selectedCourse = action.payload
        }
    }
})

export const { addCourse, delCourse, selectCourse } = courseSlice.actions
export default courseSlice.reducer