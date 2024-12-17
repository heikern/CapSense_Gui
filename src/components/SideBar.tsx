import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { geojsonActions } from '../store/geojsonSlice';

import FileUpload from './FileUpload';
import PlotForm from './PlotForm';
import SelectedPlotList from './SelectedPlotList';
import SimulateButton from './SimulateButton';
import SimulateButtonWeb from './SimulateButtonWeb';
import ResultsList from './ResultsList'
import TaskQueue from './simulationQueue';


const SideBar: React.FC = () => {
  const dispatch = useDispatch();

  const fileName = useSelector((state:any) => state.geojsonSlice.fileName)
  // const singlePlotSelected: boolean = useSelector((state:any)=> state.appStateSlice.singlePlotSelected)
  const currSelectedPlot = useSelector((state:any)=>state.selectedPlotsSlice.currSelectedPlot)
  const selectedPlots = useSelector((state:any)=> state.selectedPlotsSlice.selectedPlots)

  // State to track the active tab
  const [activeTab, setActiveTab] = useState<'plots' | 'results' | 'taskQueue'>('plots');

  return (
    <>
    <div className="p-3 bg-blue-900 h-full flex flex-col overflow-y-hidden">
      <h2 className="text-white text-lg font-semibold mb-1">Action Bar</h2>
      <FileUpload/>

      {/* CurrSelectedPlot Area */}
      <div className="mt-5 h-[40%]" style = {{visibility: currSelectedPlot.plotId? 'visible': 'hidden'}}>
        {currSelectedPlot.plotId !== null  ? 
          <PlotForm plotId={currSelectedPlot.plotId} 
          initPower={currSelectedPlot.power} 
          initYear={currSelectedPlot.stageYear}/> : undefined}
      </div>


      {/* Tab Menu + plots / sim results */}
      <div className='h-[40%]'>
        {/* Tab Menu */}
        <div className="mt-4 mb-2 flex items-center">
          <button
              className={`mr-1 px-2 py-1 ${activeTab === 'plots' ? 'bg-gray-800 text-white' : 'bg-white text-gray-300'}`}
              onClick={() => setActiveTab('plots')}
            >
              Selected Plots
            </button>
            <button
              className={`px-2 mr-1 py-1 ${activeTab === 'taskQueue' ? 'bg-gray-800 text-white' : 'bg-white text-gray-300'}`}
              onClick={() => setActiveTab('taskQueue')}
            >
              Task Queue
            </button>
            <button
              className={`px-2 py-1 ${activeTab === 'results' ? 'bg-gray-800 text-white' : 'bg-white text-gray-300'}`}
              onClick={() => setActiveTab('results')}
            >
              Results
            </button>
        </div>
        
        {/* Plots/Results List Area */}
        <div className='mt-1 h-[70%] overflow-auto'>
          {activeTab === 'plots' && <SelectedPlotList plots = {selectedPlots}/>}
          {activeTab === 'taskQueue' && <TaskQueue/>}
          {activeTab === 'results' && <ResultsList/>}
        </div>

      </div>

      {/* Simulate Button */}
      <div className="mt-5 h-[10%]">
        {/* <SimulateButton/> */}
        <SimulateButtonWeb/>
      </div>

      
    </div>
    
    </>
  );
};

export default SideBar;
