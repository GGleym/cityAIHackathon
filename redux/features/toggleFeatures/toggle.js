import {createSlice} from "@reduxjs/toolkit";


const initialState = {

}

const toggleSlice = createSlice({
    name: "toggleTransport",
    initialState,
    reducers: {
        turnOn: (state, { payload }) => {
            state.payload.id = payload.value
        }
    }
})

export const toggleSliceReducer = toggleSlice.reducer
export const toggleSliceActions = toggleSlice.actions