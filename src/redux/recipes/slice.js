import { createSlice } from '@reduxjs/toolkit';

import {
  fetchOwnRecipes,
  fetchFavRecipes,
  fetchRecipeById,
  getFilteredRecipes,
  searchRecipes,
} from './operations';

const recipesReducer = createSlice({
  name: 'recipes',
  initialState: {
    own: {
      items: [],
    },
    favorites: {
      items: [],
    },
    recipes: {
      items: [],
      totalPages: null,
    },
    current: {
      recipe: null,
      ingredients: {},
    },
    filteredRecipes: {
      page: 1,
      perPage: 12,
    },
    loading: false,
    error: false,
    errorData: { data: null },
  },

  extraReducers: builder =>
    builder
      .addCase(fetchOwnRecipes.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.own.items = action.payload;
      })
      .addCase(fetchOwnRecipes.rejected, state => {
        state.loading = false;
        state.error = true;
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchFavRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.items = action.payload;
      })
      .addCase(fetchFavRecipes.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(searchRecipes.pending, state => {
        state.loading = true;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.items = action.payload.hits;
        state.recipes.totalPages = action.payload.totalPages;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorData.data = action.payload;
      })
      .addCase(fetchRecipeById.pending, state => {
        state.loading = true;
        state.error = null;
        state.current.recipe = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.current.recipe = action.payload.recipe;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFilteredRecipes.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getFilteredRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.filteredRecipes = action.payload.data;
      })
      .addCase(getFilteredRecipes.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default recipesReducer.reducer;
