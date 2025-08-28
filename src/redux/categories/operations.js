import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient.js';

export const getCategories = createAsyncThunk(
  'filters/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/categories');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
