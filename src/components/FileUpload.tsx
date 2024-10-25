// FileUpload.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { geojsonActions } from '../store/geojsonSlice';

const FileUpload: React.FC = () => {
  const dispatch = useDispatch();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      console.log("No file selected");
      return;
    }
  
    console.log("File found:", file.name);
    dispatch(geojsonActions.setFileName(file.name));
  
    try {
      const fileContent = await readFileAsync(file);
      console.log("File content successfully read");
      
      const geojson = JSON.parse(fileContent);
      dispatch(geojsonActions.setGeojson(geojson));
      console.log(geojson);
      
      console.log("GeoJSON data dispatched");
    } catch (error) {
      console.error("Error reading or parsing file", error);
    }
  };
  
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
    <div className="p-4 bg-gray-800 rounded-lg shadow-md mb-4">
      <h3 className="text-white text-sm font-semibold mb-2">Upload GeoJSON File</h3>
      <input 
        type="file" 
        accept=".geojson" 
        className="block w-full text-sm text-gray-200 border border-gray-400 rounded-lg cursor-pointer bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUpload;
