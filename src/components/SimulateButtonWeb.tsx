// SimulateButton.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {resultsSliceActions} from '../store/resultsSlice'
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs
import { addTask } from '../store/taskSlice';

const SimulateButtonWeb: React.FC = () => {

    const dispatch = useDispatch()
    const tasks = useSelector((state:any)=> state.tasksSlice.tasks)
    const selectedPlots = useSelector((state: any)=> state.selectedPlotsSlice.selectedPlots)
    // const selectedPlots = useSelector((state: any) => state.selectedPlotsSlice.selectedPlots)
    // const results = useSelector((state: any) => state.resultsSlice.results)


    const handleAddTask = () => {
      // const taskId = Date.now().toString();
      const taskId = uuidv4();
      const taskData = selectedPlots;

      dispatch(addTask({id: taskId, data: taskData}))
      dispatch({
        type: 'websocket/send',
        payload: {
          type: 'submit-task',
          payload: {
            id: taskId,
            data: taskData
          }
        }
      })
    }

  return (
    <div>
      <button 
        onClick={handleAddTask}
        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Add Task
      </button>
    </div>
  );
};

export default SimulateButtonWeb;
