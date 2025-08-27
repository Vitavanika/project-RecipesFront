import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchOwnRecipes = createAsyncThunk(
  'recipes/getOwn',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/recipes');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchFavRecipes = createAsyncThunk(
  'recipes/getFavRecipes',
  async (_, thunkAPI) => {
export const fetchFavRecipes = createAsyncThunk(
  "recipes/getFavRecipes", 
  async (_, thunkAPI) => { 
    try {
      const response = await apiClient.get("/recipes/favorite");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } 
  }
);
