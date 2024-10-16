import {createSlice, PayloadAction} from "@reduxjs/toolkit"


interface selectedPlot {
    plotId: string;
    centroid: number[];
    power: number;
    stageYear: number;
}

interface selectedPlots {
    selectedPlots: selectedPlot[];
}


const initialState: selectedPlots = {
    selectedPlots: []
} 


const selectedPlotsSlice = createSlice({
    name: 'selectedPlotSlice',
    initialState: initialState,
    reducers: {
        addSelectedPlot: (state, action: PayloadAction<selectedPlot>) => {
            const existingSelectedPlot = state.selectedPlots.find(
                (plot) => plot.plotId === action.payload.plotId 
            )

            if (!existingSelectedPlot){
                state.selectedPlots.push(action.payload);
            }else {
                Object.assign(existingSelectedPlot, action.payload)
            }
        }
    }
})

export const selectedPlotsSliceReducer = selectedPlotsSlice.reducer;

export const selectedPlotsSliceActions = selectedPlotsSlice.actions;