import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
  getFilteredRecipes,
} from './operations';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    own: {
      items: [],
    },
    favorites: {
      items: [],
    },
    filteredRecipes: {
      page: 1,
      perPage: 12,
    },
    loading: false,
    error: false,
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

export default recipesSlice.reducer;
