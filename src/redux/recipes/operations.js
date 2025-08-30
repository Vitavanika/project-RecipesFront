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
      const response = await apiClient.get('/recipes/favorite');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFilteredRecipes = createAsyncThunk(
  'recipes/getFilteredRecipes',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const searchPhrase = state.filters.searchPhrase;
    const selectedIngredients = state.filters.selectedIngredients
      .map(ingredient => `ingredients=${ingredient}`)
      .join('&');
    const selectedCategory = state.filters.selectedCategory
      .map(category => `category=${encodeURIComponent(category)}`)
      .join('&');
    const currentPage = state.recipes.filteredRecipes.page ?? 1;
    const perPage = state.recipes.filteredRecipes.perPage ?? 12;

    const queryParams = [];
    if (searchPhrase)
      queryParams.push(`searchPhrase=${encodeURIComponent(searchPhrase)}`);
    if (selectedIngredients) queryParams.push(selectedIngredients);
    if (selectedCategory) queryParams.push(selectedCategory);
    queryParams.push(`page=${currentPage}`);
    queryParams.push(`perPage=${perPage}`);

    const requestPath = `/recipes?${queryParams.join('&')}`;

    try {
      const response = await apiClient.get(requestPath);
      return response.data.data;
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
      if (isFavorite) {
        await apiClient.delete(`/recipes/favorite/${recipeId}`);
      } else {
        await apiClient.post(`/recipes/favorite/${recipeId}`);
      }
      return { recipeId, isFavorite: !isFavorite };
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

