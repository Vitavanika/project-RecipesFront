import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
  fetchRecipeMeta,
  fetchAddRecipe,
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
    meta: {
      categories: [],
      ingredients: [],
    },
    add: {
      loading: false,
      error: null,
      success: false,
    },
    loading: false,
    error: null,
  },

  extraReducers: (builder) => builder
    // Own recipes
    .addCase(fetchOwnRecipes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.own.items = action.payload;
    })
    .addCase(fetchOwnRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || true;
    })

    // Favorite recipes
    .addCase(fetchFavRecipes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFavRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites.items = action.payload;
    })
    .addCase(fetchFavRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || true;
    })

    // Recipe metadata
    .addCase(fetchRecipeMeta.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRecipeMeta.fulfilled, (state, action) => {
      state.loading = false;
      state.meta.categories = action.payload.categories;
      state.meta.ingredients = action.payload.ingredients;
    })
    .addCase(fetchRecipeMeta.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || true;
    })

    // Add recipe
    .addCase(fetchAddRecipe.pending, (state) => {
      state.add.loading = true;
      state.add.error = null;
      state.add.success = false;
    })
    .addCase(fetchAddRecipe.fulfilled, (state) => {
      state.add.loading = false;
      state.add.success = true;
    })
    .addCase(fetchAddRecipe.rejected, (state, action) => {
      state.add.loading = false;
      state.add.error = action.payload || true;
      state.add.success = false;
    }),
});

export default recipesReducer.reducer;