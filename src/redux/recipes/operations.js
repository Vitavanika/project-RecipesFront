import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient.js';

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
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/recipes/favorites', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      return response.data.data?.hits ?? [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFilteredRecipes = createAsyncThunk(
  'recipes/getFilteredRecipes',
  async (requestParams, thunkAPI) => {
    const {
      searchPhrase,
      selectedCategories: category,
      selectedIngredients: ingredient,
      page,
      perPage,
      append,
    } = requestParams;

    const selectedIngredients = ingredient
      .map(ingredient => `ingredients=${ingredient}`)
      .join('&');
    const selectedCategory = category
      .map(category => `category=${encodeURIComponent(category)}`)
      .join('&');

    const queryParams = [];
    if (searchPhrase)
      queryParams.push(`searchPhrase=${encodeURIComponent(searchPhrase)}`);
    if (selectedIngredients) queryParams.push(selectedIngredients);
    if (selectedCategory) queryParams.push(selectedCategory);
    queryParams.push(`page=${page}`);
    queryParams.push(`perPage=${perPage}`);

    const requestPath = `/recipes?${queryParams.join('&')}`;

    try {
      const response = await apiClient.get(requestPath);
      return { ...response.data.data, append };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
        favorites,
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
