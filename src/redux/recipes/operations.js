import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient.js';

export const fetchRecipesByVariant = createAsyncThunk(
  'recipes/fetchRecipesByVariant',
  async (requestParams, thunkAPI) => {
    const { searchParams, recipeType } = requestParams;

    try {
      let endpoint = null;

      if (recipeType === 'own') {
        endpoint = '/recipes/own';
      } else if (recipeType === 'favorites') {
        endpoint = '/recipes/favorites';
      } else {
        return thunkAPI.rejectWithValue({
          message: `Unknown recipeType: ${recipeType}`,
          variant: recipeType,
        });
      }

      const response = await apiClient.get(endpoint, { params: searchParams });

      return { ...response.data.data, variant: recipeType };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          'Failed to load recipes',
        variant: recipeType,
      });
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  'recipes/getOwn',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/recipes/own');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFavRecipes = createAsyncThunk(
  'recipes/getFavRecipes',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/recipes/favorites', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFilteredRecipes = createAsyncThunk(
  'recipes/getFilteredRecipes',
  async (searchParams, thunkAPI) => {
    try {
      const response = await apiClient.get('/recipes', {
        params: searchParams,
      });
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/getById',
  async (recipeId, thunkAPI) => {
    try {
      const recipeResponse = await apiClient.get(`/recipes/${recipeId}`);
      const recipe = recipeResponse.data.data;

      return { recipe };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleFavoriteRecipe = createAsyncThunk(
  'recipes/toggleFavorite',
  async ({ recipeId, isFavorite }, thunkAPI) => {
    try {
      const method = isFavorite ? 'DELETE' : 'POST';
      const response = await apiClient({
        url: `/recipes/favorites/${recipeId}`,
        method,
      });

      thunkAPI.dispatch(fetchFavRecipes());

      return {
        recipeId,
        isFavorite: !isFavorite,
        recipe: response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
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
