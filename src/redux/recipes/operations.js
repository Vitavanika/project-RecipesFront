import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import setAuthHeader from "../auth/operations";

axios.defaults.baseURL = 'https://project-recipesback.onrender.com/api/';

// тимчасово

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchOwnRecipes = createAsyncThunk(
  'recipes/getOwn',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      setAuthHeader(state.auth.token);
      const response = await axios.get('/recipes');
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
      const state = thunkAPI.getState();
      setAuthHeader(state.auth.token);
      const response = await axios.get('/recipes/favorite');
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
      const response = await axios.get(requestPath);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipes/getById",
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
