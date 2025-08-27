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
  'recipes/getFavRecipes',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/recipes/favorite');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchRecipes = createAsyncThunk(
  'recipes/search',
  async (params, thunkAPI) => {
    try {
      const axiosParams = {
        searchPhrase: params.searchPhrase || null,
        category: params.category || null,
        igredient: params.ingredient || null,
      };
      const response = await apiClient.get('/recipes', axiosParams);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
