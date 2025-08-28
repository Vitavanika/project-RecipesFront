import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
  fetchRecipeById,
  getFilteredRecipes,
  // searchRecipes,
} from './operations';

const initialState = {
  own: {
    items: [],
    isLoading: false,
    error: null,
    errorData: null,
  },
  favorites: {
    items: [],
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
  filteredRecipes: {
    items: [],
    page: 1,
    perPage: 12,
    isLoading: false,
    error: null,
    errorData: null,
  },
  loading: false,
  error: false,
  errorData: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setPerPage(state, action) {
      state.filteredRecipes.perPage = action.payload.perPage;
    },
    setPage(state, action) {
      state.filteredRecipes.page = action.payload.page;
    },
    setPaginationParams(state, action) {
      state.filteredRecipes.perPage = action.payload.perPage;
      state.filteredRecipes.page = action.payload.page;
    },
  },
  extraReducers: builder =>
    builder
      // Own recipes
      .addCase(fetchOwnRecipes.pending, state => {
        state.own.isLoading = true;
        state.own.error = null;
        state.own.errorData = null;

        state.loading = true;
        state.error = false;
        state.errorData = null;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.own.isLoading = false;
        state.own.items = Array.isArray(action.payload) ? action.payload : [];
        state.own.error = null;

        state.loading = false;
        state.error = false;
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.own.isLoading = false;
        state.own.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load own recipes';
        state.own.errorData = action.payload ?? null;

        state.loading = false;
        state.error = true;
        state.errorData = action.payload ?? null;
      })

      // Favorites
      .addCase(fetchFavRecipes.pending, state => {
        state.favorites.isLoading = true;
        state.favorites.error = null;
        state.favorites.errorData = null;

        state.loading = true;
        state.error = false;
        state.errorData = null;
      })
      .addCase(fetchFavRecipes.fulfilled, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.items = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.favorites.error = null;

        state.loading = false;
        state.error = false;
      })
      .addCase(fetchFavRecipes.rejected, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load favorites';
        state.favorites.errorData = action.payload ?? null;

        state.loading = false;
        state.error = true;
        state.errorData = action.payload ?? null;
      })

      // Current recipe
      .addCase(fetchRecipeById.pending, state => {
        state.current.isLoading = true;
        state.current.error = null;
        state.current.errorData = null;
        state.current.recipe = null;

        state.loading = true;
        state.error = false;
        state.errorData = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.current.isLoading = false;
        state.current.recipe = action.payload?.recipe ?? null;

        state.loading = false;
        state.error = false;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.current.isLoading = false;
        state.current.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load recipe';
        state.current.errorData = action.payload ?? null;

        state.loading = false;
        state.error = true;
        state.errorData = action.payload ?? null;
      })

      // Filtered
      .addCase(getFilteredRecipes.pending, state => {
        state.filteredRecipes.isLoading = true;
        state.filteredRecipes.error = null;
        state.filteredRecipes.errorData = null;

        state.loading = true;
        state.error = false;
        state.errorData = null;
      })
      .addCase(getFilteredRecipes.fulfilled, (state, action) => {
        state.filteredRecipes.isLoading = false;
        const hits = state.filteredRecipes.hits;
        state.filteredRecipes = action.payload?.data ?? [];
        state.filteredRecipes.hits = { ...hits, ...action.payload.hits };

        state.loading = false;
        state.error = false;
      })
      .addCase(getFilteredRecipes.rejected, (state, action) => {
        state.filteredRecipes.isLoading = false;
        state.filteredRecipes.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load filtered recipes';
        state.filteredRecipes.errorData = action.payload ?? null;

        state.loading = false;
        state.error = true;
        state.errorData = action.payload ?? null;
      }),
});

export default recipesSlice.reducer;

export const { setPage, setPerPage, setPaginationParams } =
  recipesSlice.actions;
