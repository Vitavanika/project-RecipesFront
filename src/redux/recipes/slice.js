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
  },
  current: {
    recipe: null,
    ingredients: {},
  },
  loading: false,
  error: false,
  errorData: { data: null },
};

const recipesReducer = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnRecipes.pending, (state) => {
        state.own.isLoading = true;
        state.own.error = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.own.isLoading = false;
        state.own.items = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.own.isLoading = false;
        state.own.error =
          action.payload?.message || action.error?.message || 'Failed to load own recipes';
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchFavRecipes.pending, (state) => {
        state.favorites.isLoading = true;
        state.favorites.error = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchFavRecipes.fulfilled, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.items = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchFavRecipes.rejected, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.error =
          action.payload?.message || action.error?.message || 'Failed to load favorites';
        state.loading = false;
        state.error = true;
      })
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.items = action.payload?.hits ?? [];
        state.recipes.totalPages = action.payload?.totalPages ?? null;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData.data = action.payload ?? null;
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.current.recipe = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.current.recipe = action.payload?.recipe ?? null;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData.data = action.payload ?? null;
      });
  },
});

export default recipesReducer.reducer;
