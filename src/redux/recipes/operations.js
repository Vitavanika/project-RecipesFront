import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient.js';

export const fetchRecipesByVariant = createAsyncThunk(
  'recipes/fetchRecipesByVariant',
  async (variant, thunkAPI) => {
    const state = thunkAPI.getState();
    const { own, favorites } = state.recipes;

    try {
      if (variant === 'own' && own.items.length === 0 && !own.isLoading) {
        const { data } = await apiClient.get('/recipes/own');
        return { ...data.data, variant: 'own' };
      }

      if (
        variant === 'favorites' &&
        favorites.items.length === 0 &&
        !favorites.isLoading
      ) {
        const { data } = await apiClient.get('/recipes/favorites');
        return { ...data.data, variant: 'favourites' };
      }

      return thunkAPI.rejectWithValue('Data already loaded or loading.');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
