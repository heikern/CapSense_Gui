import { configureStore } from "@reduxjs/toolkit";
import {geojsonReducer} from "./geojsonSlice"
import { selectedPlotsSliceReducer } from "./selectedPlotsSlice";

const store = configureStore({
    reducer: {
        geojsonSlice: geojsonReducer,
        selectedPlotsSlice: selectedPlotsSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false, // Disable the serializable check
    }),
})

export default store