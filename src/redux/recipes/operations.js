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

export getFilteredRecipes = createAsyncThunk(
    'recipes/getFilteredRecipes',
    async (_, thunkAPI) => { 
        const state = thunkAPI.getState();
        const searchPhrase = state.filters.searchPhrase;
        const 

    }
);