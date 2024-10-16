import { configureStore } from "@reduxjs/toolkit";
import {geojsonReducer} from "./geojsonSlice"

const store = configureStore({
    reducer: {
        geojsonSlice: geojsonReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false, // Disable the serializable check
    }),
})

export default store