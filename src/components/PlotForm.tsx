import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { selectedPlotsSliceActions } from '../store/selectedPlotsSlice';

interface PlotFormProps {
  plotId: string;
  initPower: number | null;
  initYear: number | null;
}

const PlotForm: React.FC<PlotFormProps> = ({ plotId, initPower, initYear}) => {
  const dispatch = useDispatch();
  
  const [power, setPower] = useState<number | string>(initPower ?? '');
  const [year, setYear] = useState<number | string>(initYear ?? '');

  useEffect(()=>{
    setPower(initPower ?? '');
    setYear(initYear ?? '');
  }, [initPower, initYear])

  const handlePowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Prevent prepending a 0 when clearing the field or entering a number
    if (/^\d*$/.test(value)) {
      setPower(value === '' ? '' : parseInt(value, 10));
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setYear(value === '' ? '' : parseInt(value, 10));
    }
  };

  const handleAddLoad = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (typeof power === 'number' && typeof year === 'number'){
      dispatch(selectedPlotsSliceActions.setCurrSelectedPlotPower(power))
      dispatch(selectedPlotsSliceActions.setCurrSelectedPlotYear(year))
      dispatch(selectedPlotsSliceActions.addSelectedPlot())
      dispatch(selectedPlotsSliceActions.resetCurrSelectedPlot())
      setPower('');
      setYear('');
    }
   
  }

  return (
    <div className="p-2 bg-gray-800 rounded-lg shadow-md mb-2">
      <h3 className="text-white text-sm font-semibold mb-2">Plot Id: {plotId}</h3>

      <label className="block text-sm font-medium text-white">Power:</label>
      <input
        type="text"
        value={power}
        onChange={handlePowerChange}
        className="border rounded px-2 py-1 mb-4 w-full"
      />

      <label className="block text-sm font-medium text-white">Year:</label>
      <input
        type="text"
        value={year}
        onChange={handleYearChange}
        className="border rounded px-2 py-1 mb-4 w-full"
      />

      <button onClick={handleAddLoad} className="bg-blue-500 text-white rounded py-1 w-full">
        Add load
      </button>
    </div>
  );
};

export default PlotForm;
