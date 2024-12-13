import { configureStore } from "@reduxjs/toolkit";
import {geojsonReducer} from "./geojsonSlice"
import { selectedPlotsSliceReducer } from "./selectedPlotsSlice";
import { taskSliceReducer } from "./taskSlice";
// import { appStateSliceReducer } from "./appStateSlice";
import {resultsSliceReducer} from "./resultsSlice"

import websocketMiddleware from "../middleware/wsMiddleware"

const store = configureStore({
    reducer: {
        geojsonSlice: geojsonReducer,
        selectedPlotsSlice: selectedPlotsSliceReducer,
        // appStateSlice: appStateSliceReducer,
        resultsSlice: resultsSliceReducer,
        tasksSlice: taskSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false, // Disable the serializable check
    }).concat(websocketMiddleware),
})

export default store