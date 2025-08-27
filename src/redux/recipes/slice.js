import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
  fetchRecipeById,
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
    current: {
      recipe: null,
      ingredients: {},
    },
    loading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      .addCase(fetchOwnRecipes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.own.items = action.payload;
      })
      .addCase(fetchOwnRecipes.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchFavRecipes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchFavRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.items = action.payload;
      })
      .addCase(fetchFavRecipes.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchRecipeById.pending, state => {
        state.loading = true;
        state.error = null;
        state.current.recipe = null;
        state.current.ingredients = {};
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.current.recipe = action.payload.recipe;
        state.current.ingredients = action.payload.ingredientsMap;
      })
      .addCase(fetchRecipeById.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default recipesReducer.reducer;
