import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-recipesback.onrender.com/api/';

export const getCategories = createAsyncThunk(
  'filters/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/categories');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
