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
  'recipes/getFavRecipes',
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

const buildAxiosParams = params => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null && v !== '')
  );
};

export const searchRecipes = createAsyncThunk(
  'recipes/search',
  async (params, thunkAPI) => {
    try {
      const rawParams = {
        searchPhrase: params.searchPhrase || null,
        category: params.category || null,
        ingredient: params.ingredient || null,
        page: params.page || 1,
        perPage: params.perPage || 12,
      };
      const axiosParams = buildAxiosParams(rawParams);

      const response = await apiClient.get('/recipes', {
        params: axiosParams,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
