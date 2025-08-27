import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import setAuthHeader from "../auth/operations";

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
      const response = await axios.get('api/recipes');
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
        setAuthHeader (state.auth.token);
        const response = await axios.get("api/recipes/favorite");
      return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } 
    
 });

export const fetchRecipeById = createAsyncThunk(
  'recipes/getById',
  async (recipeId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      setAuthHeader(state.auth.token);

      const recipeResponse = await axios.get(
        `https://project-recipesback.onrender.com/api/recipes/${recipeId}`
      );

      const recipe = recipeResponse.data.data;

      const ingredientIds = recipe.ingredients.map(ing => ing.id);
      const ingredientsResponse = await axios.get(
        'https://project-recipesback.onrender.com/api/ingredients',
        { params: { ids: ingredientIds.join(',') } }
      );

      const ingredientsMap = {};
      ingredientsResponse.data.forEach(ingredient => {
        ingredientsMap[ingredient._id] = ingredient.name;
      });

      return { recipe, ingredientsMap };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
