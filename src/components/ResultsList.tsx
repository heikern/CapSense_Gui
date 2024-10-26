import React from 'react'

import { useSelector } from 'react-redux'

const ResultWindow_new: React.FC = ()=>{
    const results = useSelector((state: any) => state.resultsSlice.results)

    if (results.length === 0) {
        return (
            <div className="mt-6">
                <p className="text-gray-400">No results available.</p>
            </div>
        )
    } else {
        return (
            <div className="mt-6">
                <div className="max-h-70 overflow-y-auto">
                    {results
                    .slice()
                    .reverse()
                    .map((result: any, index: any)=> (
                        <div 
                            key={index} 
                            // className="bg-gray-200 rounded-lg p-0.5 mb-1"
                            className = {`rounded-lg p-0.5 mb-1 ${
                                result.finding.summary === 'Success' ? 'bg-green-200' : 'bg-red-200'
                            }`}
                        >
                            <h4 className="text-sm font-medium">Result Id: ***{result.resultId.slice(-4) ?? 'N/A'}</h4>
                            <p className="text-sm">Result: {result.finding.summary ?? 'N/A'}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ResultWindow_new