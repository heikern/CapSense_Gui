import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectedPlotsSliceActions } from '../store/selectedPlotsSlice';

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

  const dispatch = useDispatch()
  const currSelectedPlot = useSelector((state: any) => state.selectedPlotsSlice.currSelectedPlot)

  const handleClick = (plot: SelectedPlot) => {
    dispatch(selectedPlotsSliceActions.setCurrSelectedPlot(plot))
  }

  if (plots.length === 0){
      return (
          <div className="mt-6">
            <p className="text-gray-400">No plots available.</p>
          </div>
        );
  }

  return (
  <div className="mt-6">
      <div className="max-h-70 overflow-y-auto">
      {plots
          .slice()
          .reverse()
          .map((plot, index) => (
                  <div 
                    key={index} 
                    className= {`bg-gray-200 rounded-lg p-0.5 m-2
                                ${currSelectedPlot.plotId === plot.plotId ? 'outline outline-2 outline-green-500 outline-offset-2' : ''}`}
                    onClick={()=>{handleClick(plot)}}
                    >
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
