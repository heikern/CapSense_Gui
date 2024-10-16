import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appState {
    singlePlotSelected: boolean
    selectedPlotId: string | null
}

const initialState: appState = {
    singlePlotSelected: false,
    selectedPlotId: null
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
        },
        setSelectedPlotId: (state, action: PayloadAction<string | null>) => {
            state.selectedPlotId = action.payload
        }
    }
})

export const appStateSliceReducer = appStateSlice.reducer
export const appStateSliceActions = appStateSlice.actions