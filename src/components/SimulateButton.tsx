// SimulateButton.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {resultsSliceActions} from '../store/resultsSlice'
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs

const SimulateButton: React.FC = () => {

    const dispatch = useDispatch()
    // const selectedPlots = useSelector((state: any) => state.selectedPlotsSlice.selectedPlots)
    // const results = useSelector((state: any) => state.resultsSlice.results)

    const handleClick = () => {
        console.log("Simulate button clicked");
        // Add any additional logic for the simulate action here

        // assign a unique ID
        const resultId = uuidv4();

        const successProbability = 0.3;
        const success = Math.random() < successProbability;

        let details: string;
        let summary: string;
        if (success){
            summary = "Success"
            details = "No constraints found"
        } else {
            summary = "Failed"
            details = "Network constraints found"
        }

        const newResult = {
            resultId: resultId,
            finding:{
                summary: summary,
                details: details
            }
        }

        dispatch(resultsSliceActions.addResult(newResult))

        // Take in the selected plots from the selected plot slice

        // Assign a simulation ID

        // Provide an assesment
    };

  return (
    <div className="mt-5">
      <button
        onClick={handleClick}
        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Simulate
      </button>
    </div>
  );
};

export default SimulateButton;
