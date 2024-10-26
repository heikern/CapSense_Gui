import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface finding {
    summary: string | null;
    details: string | null;
}

interface result {
    resultId: string | null;
    finding: finding | null;
}

// Define the structure for results
interface resultsState {
    results: result[];
    currResult: result;
}

const initialResultsState: resultsState = {
    results: [],
    currResult: {
        resultId: null,
        finding: null
    }
};

// Create the results slice
export const resultsSlice = createSlice({
    name: 'resultsSlice',
    initialState: initialResultsState,
    reducers: {
        // Action to add results for a specific plot
        addResult: (state, action: PayloadAction<result>) => {
            const existingResult = state.results.find(
                (res) => res.resultId === action.payload.resultId
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
                (res) => res.resultId === action.payload
            );

            if (existingResult) {
                state.currResult = existingResult;
            } else {
                state.currResult = {
                    resultId: action.payload,
                    finding: null
                };
            }
        },
        // Action to set current result findings
        setCurrResultFindings: (state, action: PayloadAction<finding>) => {
            if (state.currResult.resultId) {
                state.currResult.finding = action.payload;
            }
        },
        // Action to reset current result
        resetCurrResult: (state) => {
            state.currResult = {
                resultId: null,
                finding: null
            };
        }
    }
});

// Export the results slice reducer
export const resultsSliceReducer = resultsSlice.reducer;

// Export the results slice actions
export const resultsSliceActions = resultsSlice.actions;


