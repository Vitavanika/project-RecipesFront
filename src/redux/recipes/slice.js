import { createSlice } from '@reduxjs/toolkit';
import { fetchOwnRecipes, fetchFavRecipes } from './operations';

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
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnRecipes.pending, (state) => {
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
          action.payload?.message || action.error?.message || 'Failed to load own recipes';
      })
      .addCase(fetchFavRecipes.pending, (state) => {
        state.favorites.isLoading = true;
        state.favorites.error = null;
      })
      .addCase(fetchFavRecipes.fulfilled, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.items = Array.isArray(action.payload) ? action.payload : [];
        state.favorites.error = null;
      })
      .addCase(fetchFavRecipes.rejected, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.error =
          action.payload?.message || action.error?.message || 'Failed to load favorites';
      });
  },
});

export default recipesSlice.reducer;
