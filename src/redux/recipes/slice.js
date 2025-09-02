import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
  fetchRecipeById,
  toggleFavoriteRecipe,
  getFilteredRecipes,
  fetchAddRecipe,
} from './operations';

import { logOut } from '../auth/operations';

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
    hits: [],
    page: 1,
    perPage: 12,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
    totalItems: 0,
    isLoading: false,
    error: null,
    errorData: null,
  },
  add: {
    loading: false,
    error: null,
    success: false,
  },
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
    resetHits(state) {
      state.filteredRecipes = initialState.filteredRecipes;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOwnRecipes.pending, state => {
        state.own.isLoading = true;
        state.own.error = null;
        state.own.errorData = null;
      })
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.own.isLoading = false;
        state.own.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchOwnRecipes.rejected, (state, action) => {
        state.own.isLoading = false;
        state.own.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load own recipes';
        state.own.errorData = action.payload ?? null;
      })
      .addCase(fetchFavRecipes.pending, state => {
        state.favorites.isLoading = true;
        state.favorites.error = null;
        state.favorites.errorData = null;
      })
      .addCase(fetchFavRecipes.fulfilled, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.error = null;
        state.favorites.items = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchFavRecipes.rejected, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.error = action.payload;
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
      })

      .addCase(toggleFavoriteRecipe.fulfilled, (state, action) => {
        const { recipeId, isFavorite } = action.payload;

         if (state.favorites && state.favorites.items) {
          if (isFavorite) {
            if (!state.favorites.items.includes(recipeId)) {
              state.favorites.items.push(recipeId);
            }
          }
        } else {
          state.favorites.items = state.favorites.items.filter(
            id => id !== recipeId
          );
        }
      })

      .addCase(toggleFavoriteRecipe.rejected, (state, action) => {
        state.favorites.error = action.payload;
      })

      .addCase(getFilteredRecipes.pending, state => {
        state.filteredRecipes.isLoading = true;
        state.filteredRecipes.error = null;
        state.filteredRecipes.errorData = null;
      })
      .addCase(getFilteredRecipes.fulfilled, (state, action) => {
        state.filteredRecipes.hits = [
          ...state.filteredRecipes.hits,
          ...(action.payload?.hits ?? []),
        ];
        state.filteredRecipes.page =
          action.payload?.page ?? state.filteredRecipes.page;
        state.filteredRecipes.perPage =
          action.payload?.perPage ?? state.filteredRecipes.perPage;
        state.filteredRecipes.totalPages = action.payload?.totalPages ?? 0;
        state.filteredRecipes.hasPreviousPage =
          !!action.payload?.hasPreviousPage;
        state.filteredRecipes.hasNextPage = !!action.payload?.hasNextPage;
        state.filteredRecipes.totalItems = action.payload?.totalItems ?? 0;
        state.filteredRecipes.isLoading = false;
      })
      .addCase(getFilteredRecipes.rejected, (state, action) => {
        state.filteredRecipes.isLoading = false;
        state.filteredRecipes.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to load filtered recipes';
        state.filteredRecipes.errorData = action.payload ?? null;
      })

      // Add recipe
      .addCase(fetchAddRecipe.pending, state => {
        state.add.loading = true;
        state.add.error = null;
        state.add.success = false;
      })
      .addCase(fetchAddRecipe.fulfilled, state => {
        state.add.loading = false;
        state.add.success = true;
      })
      .addCase(fetchAddRecipe.rejected, (state, action) => {
        state.add.loading = false;
        state.add.error = action.payload || true;
        state.add.success = false;
      })
      .addCase(logOut.fulfilled, () => initialState);
  },
});

export default recipesSlice.reducer;
export const { setPage, setPerPage, setPaginationParams, resetHits } =
  recipesSlice.actions;
