import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geojsonActions } from '../store/geojsonSlice';

import FileUpload from './FileUpload';
import PlotForm from './PlotForm';
import SelectedPlotList from './SelectedPlotList';
import SimulateButton from './SimulateButton';
import ResultsWindow from './ResultsWindow';


const SideBar: React.FC = () => {
  const dispatch = useDispatch();

  const fileName = useSelector((state:any) => state.geojsonSlice.fileName)
  // const singlePlotSelected: boolean = useSelector((state:any)=> state.appStateSlice.singlePlotSelected)
  const currSelectedPlot = useSelector((state:any)=>state.selectedPlotsSlice.currSelectedPlot)
  const selectedPlots = useSelector((state:any)=> state.selectedPlotsSlice.selectedPlots)

  // State to track the active tab
  const [activeTab, setActiveTab] = useState<'plots' | 'results'>('plots');

  return (
    <>
    <div className="p-4 bg-blue-900 h-full flex flex-col">
      <h2 className="text-white text-lg font-semibold mb-4">Action Bar</h2>
      <FileUpload/>

      {/* CurrSelectedPlot Area */}
      <div className="mt-5 h-[30%]">
        {currSelectedPlot.plotId !== null  ? 
          <PlotForm plotId={currSelectedPlot.plotId} 
          initPower={currSelectedPlot.power} 
          initYear={currSelectedPlot.stageYear}/> : undefined}
      </div>

      {/* Tab Menu */}
      <div className="mt-4 mb-2 flex h-[10%] items-center">
          <button
            className={`mr-1 px-2 py-1 ${activeTab === 'plots' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900'}`}
            onClick={() => setActiveTab('plots')}
          >
            Selected Plots
          </button>
          <button
            className={`px-2 py-1 ${activeTab === 'results' ? 'bg-gray-800 text-white' : 'bg-white text-blue-900'}`}
            onClick={() => setActiveTab('results')}
          >
            Results
          </button>
        </div>
      {/* Plots/Results List Area */}
      <div className='mt-5 overflow-auto h-[50%]'>
        {activeTab === 'plots' ? <SelectedPlotList plots = {selectedPlots}/> : <ResultsWindow/>}
        {/* <SelectedPlotList plots = {selectedPlots}/> */}
      </div>

      {/* Simulate Button */}
      <div className="mt-5 h-[10%]">
        <SimulateButton/>
      </div>

      
    </div>
    
    </>
  );
};

export default SideBar;
