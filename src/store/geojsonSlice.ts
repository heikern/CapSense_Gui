import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GeojsonState {
    data: any | null;
}

const initialState: GeojsonState = {
    data: null,
}

export const geojsonSlice = createSlice({
    name: 'geojsonSlice',
    initialState: initialState,
    reducers:{
        setGeojson: (state, action: PayloadAction<any>) => {
            state.data = action.payload
        }
    }
});

export const geojsonActions = geojsonSlice.actions
export const geojsonReducer = geojsonSlice.reducer