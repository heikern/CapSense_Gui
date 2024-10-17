import React from 'react';

interface SelectedPlot {
  plotId: string | null;
  centroid: number[] | null;
  power: number | null;
  stageYear: number | null;
}

interface SelectedPlotListProps {
  plots: SelectedPlot[];
}

const SelectedPlotList: React.FC<SelectedPlotListProps> = ({ plots }) => {

    if (plots.length === 0){
        return (
            <div className="mt-6">
              <h3 className="text-white text-md font-semibold mb-2">Selected Plots</h3>
              <p className="text-gray-400">No plots available.</p>
            </div>
          );
    }

    return (
    <div className="mt-6">
        <h3 className="text-white text-md font-semibold mb-2">Selected Plots</h3>
        <div className="max-h-64 overflow-y-auto">
        {plots
            .slice()
            .reverse()
            .map((plot, index) => (
                    <div key={index} className="bg-gray-200 rounded-lg p-3 mb-2">
                    <h4 className="text-sm font-medium">Plot Id: {plot.plotId ?? 'N/A'}</h4>
                    <p className="text-sm">Power: {plot.power ?? 'N/A'}</p>
                    <p className="text-sm">Year: {plot.stageYear ?? 'N/A'}</p>
                    </div>
                ))}
        </div>
    </div>
    );
};

export default SelectedPlotList;
