import {createSlice, PayloadAction} from "@reduxjs/toolkit"


interface selectedPlot {
    plotId: string | null;
    centroid: number[] | null;
    power: number | null;
    stageYear: number | null;
}

interface selectedPlots {
    selectedPlots: selectedPlot[];
    currSelectedPlot: selectedPlot
}


const initialState: selectedPlots = {
    selectedPlots: [],
    currSelectedPlot: {
        plotId: null,
        centroid: null,
        power: null,
        stageYear: null
    }
} 


const selectedPlotsSlice = createSlice({
    name: 'selectedPlotSlice',
    initialState: initialState,
    reducers: {
        // addSelectedPlot: (state, action: PayloadAction<selectedPlot>) => {
        //     const existingSelectedPlot = state.selectedPlots.find(
        //         (plot) => plot.plotId === action.payload.plotId 
        //     )

        //     if (!existingSelectedPlot){
        //         state.selectedPlots.push(action.payload);
        //     }else {
        //         Object.assign(existingSelectedPlot, action.payload)
        //     }
        // },
        addSelectedPlot: (state) => {
            const existingSelectedPlot = state.selectedPlots.find(
                (plot) => plot.plotId === state.currSelectedPlot.plotId
            )

            if (!existingSelectedPlot){
                state.selectedPlots.push(state.currSelectedPlot);
            }else {
                Object.assign(existingSelectedPlot, state.currSelectedPlot)
            }
        },
        deleteSelectedPlot: (state)=>{

            const index = state.selectedPlots.findIndex(
                (plot) => plot.plotId === state.currSelectedPlot.plotId
            );

            if (index !== -1){
                console.log("starting to delete")
                state.selectedPlots.splice(index,1);
                state.currSelectedPlot = {
                    plotId: null,
                    centroid: null,
                    power: null,
                    stageYear: null
                }
            }

        },
        getCurrSelectedPlot: (state, action: PayloadAction<string>) => {
            const existingSelectedPlot = state.selectedPlots.find(
                (plot) => plot.plotId === action.payload 
            )

            if (existingSelectedPlot){
                state.currSelectedPlot = existingSelectedPlot
            } else {
                state.currSelectedPlot = {
                    plotId: action.payload,
                    centroid: null,
                    power: null,
                    stageYear: null
                }
            }

        },
        setCurrSelectedPlot: (state, action: PayloadAction<selectedPlot>) => {
            state.currSelectedPlot = action.payload
        },
        setCurrSelectedPlotCentroid: (state, action: PayloadAction<number[]>)=>{
            state.currSelectedPlot.centroid = action.payload
        },
        setCurrSelectedPlotPower: (state, action: PayloadAction<number>)=>{
            state.currSelectedPlot.power = action.payload
        },
        setCurrSelectedPlotYear: (state, action: PayloadAction<number>)=>{
            state.currSelectedPlot.stageYear = action.payload
        },
        resetCurrSelectedPlot: (state)=>{
            state.currSelectedPlot = {
                plotId: null,
                centroid: null,
                power: null,
                stageYear: null
            }
        }
    }
})

export const selectedPlotsSliceReducer = selectedPlotsSlice.reducer;

export const selectedPlotsSliceActions = selectedPlotsSlice.actions;