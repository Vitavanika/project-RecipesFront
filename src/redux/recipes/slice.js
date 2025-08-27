import { createSlice } from '@reduxjs/toolkit';
import { fetchOwnRecipes, fetchFavRecipes } from './operations';

const recipesReducer = createSlice({
  name: 'recipes',
  initialState: {
    own: {
      items: [],
      currentPage: 1,
      totalPages: 1,
    },
    favorites: {
      items: [],
      currentPage: 1,
      totalPages: 1,
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
        const { items, page, totalPages } = action.payload;
        if (page === 1) {
          state.own.items = items;
        } else {
          state.own.items = [...state.own.items, ...items];
        }
        state.own.currentPage = page;
        state.own.totalPages = totalPages;
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
        const { items, page, totalPages } = action.payload;
        if (page === 1) {
          state.favorites.items = items;
        } else {
          state.favorites.items = [...state.favorites.items, ...items];
        }
        state.favorites.currentPage = page;
        state.favorites.totalPages = totalPages;
      })
      .addCase(fetchFavRecipes.rejected, state => {
        state.loading = false;
        state.error = true;
      }),
});

export default recipesReducer.reducer;
