import { createSlice } from "@reduxjs/toolkit";

interface appState {
    singlePlotSelected: boolean
}

const initialState: appState = {
    singlePlotSelected: false
}

const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState: initialState,
    reducers: {
        setSinglePlotSelected: (state) => {
            state.singlePlotSelected = true
        },
        resetSinglePlotSelected: (state) => {
            state.singlePlotSelected = false
        }
    }
})

export const appStateSliceReducer = appStateSlice.reducer
export const appStateSliceActions = appStateSlice.actions