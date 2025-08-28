import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
  fetchRecipeById,
  searchRecipes,
} from './operations';

const initialState = {
  own: {
    items: [],
    isLoading: false,
    error: null,
  },
  favorites: {
    items: [],
    isLoading: false,
    error: null,
  },
  recipes: {
    items: [],
    totalPages: null,
    isLoading: false,
    error: null,
    errorData: null,
  },
  current: {
    recipe: null,
    ingredients: {},
    isLoading: false,
    error: null,
    errorData: null,
  },
};

const recipesReducer = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOwnRecipes.pending, state => {
        state.own.isLoading = true;
        state.own.error = null;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.own.isLoading = false;
        state.own.items = Array.isArray(action.payload) ? action.payload : [];
        state.own.error = null;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.own.isLoading = false;
        state.own.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load own recipes';
      })
      .addCase(fetchFavRecipes.pending, state => {
        state.favorites.isLoading = true;
        state.favorites.error = null;
      })
      .addCase(fetchFavRecipes.fulfilled, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.items = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.favorites.error = null;
      })
      .addCase(fetchFavRecipes.rejected, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load favorites';
      })
      .addCase(searchRecipes.pending, state => {
        state.recipes.isLoading = true;
        state.recipes.error = null;
        state.recipes.errorData = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.recipes.isLoading = false;
        state.recipes.items = action.payload?.hits ?? [];
        state.recipes.totalPages = action.payload?.totalPages ?? null;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.recipes.isLoading = false;
        state.recipes.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to search recipes';
        state.recipes.errorData = action.payload ?? null;
      })

      .addCase(fetchRecipeById.pending, state => {
        state.current.isLoading = true;
        state.current.error = null;
        state.current.errorData = null;
        state.current.recipe = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.current.isLoading = false;
        state.current.recipe = action.payload?.recipe ?? null;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.current.isLoading = false;
        state.current.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load recipe';
        state.current.errorData = action.payload ?? null;
      });
  },
});

export default recipesReducer.reducer;
