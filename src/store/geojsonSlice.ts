 import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GeojsonState {
    fileName: string | null;
    data: any | null;
}

const initialState: GeojsonState = {
    fileName: null,
    data: null,
}

export const geojsonSlice = createSlice({
    name: 'geojsonSlice',
    initialState: initialState,
    reducers:{
        setGeojson: (state, action: PayloadAction<any>) => {
            state.data = action.payload
        },
        setFileName: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload
        }
    }
});

export const geojsonActions = geojsonSlice.actions
export const geojsonReducer = geojsonSlice.reducer