import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchSimResults = createAsyncThunk(
    'results/loadScenario',
    async (loadScenario, {rejectWithValue }) => {
        try {
            const response = await axios.post('/api/results', loadScenario);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Error sending LoadScenario')
        }
    }
)