import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geojsonActions } from '../store/geojsonSlice';

import PlotForm from './PlotForm';


const SideBar: React.FC = () => {
  const dispatch = useDispatch();

  const fileName = useSelector((state:any) => state.geojsonSlice.fileName)
  const singlePlotSelected: boolean = useSelector((state:any)=> state.appStateSlice.singlePlotSelected)
  const selectedPlotId: string | null = useSelector((state:any)=> state.appStateSlice.selectedPlotId)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      console.log("No file selected");
      return;
    }
  
    console.log("File found:", file.name);
    dispatch(geojsonActions.setFileName(file.name))
  
    try {
      // Use await to ensure the file is read completely
      const fileContent = await readFileAsync(file);
  
      console.log("File content successfully read");
      
      // Parse the file content as GeoJSON
      const geojson = JSON.parse(fileContent);
      
      // Dispatch the action to store the GeoJSON data in Redux
      dispatch(geojsonActions.setGeojson(geojson));
      console.log(geojson)
      
      console.log("GeoJSON data dispatched");
    } catch (error) {
      console.error("Error reading or parsing file", error);
    }
  };
  
  // Helper function to read the file asynchronously
  const readFileAsync = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result as string);
      };
  
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
  
      reader.readAsText(file);
    });
  };

  return (
    <>
    <div className="p-4 bg-blue-900 h-full">
      <h2 className="text-white text-lg font-semibold mb-4">Action Bar</h2>

      <input 
      type="file" 
      accept='.geojson' 
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      onChange={handleFileUpload}
      />

      <h2 className="text-white">{fileName ? fileName: undefined}</h2>
      <div className="mt-10">
        {selectedPlotId !== null  ? <PlotForm plotId={selectedPlotId} initPower={10} initYear={0} onClose={()=>{}}/> : undefined}
      </div>
      
    </div>
    
    </>
  );
};

export default SideBar;
