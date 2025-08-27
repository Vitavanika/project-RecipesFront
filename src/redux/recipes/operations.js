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

export const fetchRecipeMeta = createAsyncThunk(
  'recipes/fetchMeta',
  async (_, thunkAPI) => {
    try {
      const [catRes, ingRes] = await Promise.all([
        apiClient.get('/categories'),
        apiClient.get('/ingredients'),
      ]);

      return {
        categories: Array.isArray(catRes.data) ? catRes.data : [],
        ingredients: Array.isArray(ingRes.data) ? ingRes.data : [],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Failed to load recipe metadata'
      );
    }
  }
);

export const fetchAddRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async (formData, thunkAPI) => {
    try {
      const response = await apiClient.post('/recipes', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Failed to add recipe'
      );
    }
  }
);
