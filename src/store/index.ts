import { configureStore } from "@reduxjs/toolkit";
import {geojsonReducer} from "./geojsonSlice"
import { selectedPlotsSliceReducer } from "./selectedPlotsSlice";
import { appStateSliceReducer } from "./appStateSlice";

const store = configureStore({
    reducer: {
        geojsonSlice: geojsonReducer,
        selectedPlotsSlice: selectedPlotsSliceReducer,
        appStateSlice: appStateSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false, // Disable the serializable check
    }),
})

export default store