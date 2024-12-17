import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedPlot } from '../components/SelectedPlotList';

export interface Task {
  id: string;
  data: SelectedPlot[];
  status: 'pending' | 'completed';
  result?: any | null;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ id: string; data: SelectedPlot[] }>) {
      state.tasks.push({ ...action.payload, status: 'pending' });
    },
    taskCompleted(state, action: PayloadAction<{ taskId: string; result: string }>) {
        const task = state.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
        task.status = 'completed';
        // task.result = action.payload.result;
        }
    },
  },
});

export const { addTask, taskCompleted } = tasksSlice.actions;
export const taskSliceReducer =  tasksSlice.reducer;