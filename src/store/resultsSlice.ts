import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define an interface for the results findings
interface findings {
    summary: string | null;
    details: string | null;
}

// Define an interface for the result
interface result {
    plotId: string | null;
    findings: findings | null;
}

// Define the structure for results
interface resultsState {
    results: result[];
    currResult: result;
}

// Initial state for the results slice
const initialResultsState: resultsState = {
    results: [],
    currResult: {
        plotId: null,
        findings: null
    }
};

// Create the results slice
const resultsSlice = createSlice({
    name: 'resultsSlice',
    initialState: initialResultsState,
    reducers: {
        // Action to add results for a specific plot
        addResult: (state, action: PayloadAction<result>) => {
            const existingResult = state.results.find(
                (res) => res.plotId === action.payload.plotId
            );

            if (!existingResult) {
                state.results.push(action.payload);
            } else {
                Object.assign(existingResult, action.payload);
            }
        },
        // Action to get current result based on plot ID
        getCurrResult: (state, action: PayloadAction<string>) => {
            const existingResult = state.results.find(
                (res) => res.plotId === action.payload
            );

            if (existingResult) {
                state.currResult = existingResult;
            } else {
                state.currResult = {
                    plotId: action.payload,
                    findings: null
                };
            }
        },
        // Action to set current result findings
        setCurrResultFindings: (state, action: PayloadAction<findings>) => {
            if (state.currResult.plotId) {
                state.currResult.findings = action.payload;
            }
        },
        // Action to reset current result
        resetCurrResult: (state) => {
            state.currResult = {
                plotId: null,
                findings: null
            };
        }
    }
});

// Export the results slice reducer
export const resultsSliceReducer = resultsSlice.reducer;

// Export the results slice actions
export const resultsSliceActions = resultsSlice.actions;
