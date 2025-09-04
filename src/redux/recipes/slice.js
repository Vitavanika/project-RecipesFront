import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOwnRecipes,
  fetchFavRecipes,
  fetchRecipeById,
  toggleFavoriteRecipe,
  getFilteredRecipes,
  fetchAddRecipe,
  fetchRecipesByVariant,
} from './operations';

import { logOut } from '../auth/operations';

const initialState = {
  own: {
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
  favorites: {
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
    setFavoritesPage(state, action) {
      state.favorites.page = action.payload;
    },
    setOwnPage(state, action) {
      state.own.page = action.payload;
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
        const {
          hits,
          page,
          perPage,
          totalPages,
          hasPreviousPage,
          hasNextPage,
          totalItems,
        } = action.payload;

        if (page > 1) {
          state.own.hits = [...(state.own.hits || []), ...(hits || [])];
        } else {
          state.own.hits = hits || [];
        }

        state.own.page = page;
        state.own.perPage = perPage;
        state.own.totalPages = totalPages;
        state.own.hasPreviousPage = hasPreviousPage;
        state.own.hasNextPage = hasNextPage;
        state.own.totalItems = totalItems;
        state.own.isLoading = false;
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
        const {
          hits,
          page,
          perPage,
          totalPages,
          hasPreviousPage,
          hasNextPage,
          totalItems,
        } = action.payload;

        if (page > 1) {
          state.favorites.hits = [
            ...(state.favorites.hits || []),
            ...(hits || []),
          ];
        } else {
          state.favorites.hits = hits || [];
        }

        state.favorites.page = page;
        state.favorites.perPage = perPage;
        state.favorites.totalPages = totalPages;
        state.favorites.hasPreviousPage = hasPreviousPage;
        state.favorites.hasNextPage = hasNextPage;
        state.favorites.totalItems = totalItems;
        state.favorites.isLoading = false;
      })
      .addCase(fetchFavRecipes.rejected, (state, action) => {
        state.favorites.isLoading = false;
        state.favorites.error =
          action.payload?.message || 'Failed to load favorite recipes';
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

        if (state.favorites && state.favorites.hits) {
          if (isFavorite) {
            if (!state.favorites.hits.includes(recipeId)) {
              state.favorites.hits.push(recipeId);
            }
          }
        } else {
          state.favorites.hits = state.favorites.hits.filter(
            id => id !== recipeId
          );
        }
      })

      .addCase(toggleFavoriteRecipe.rejected, (state, action) => {
        state.favorites.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to toggle favorite status.';
      })

      .addCase(getFilteredRecipes.pending, state => {
        state.filteredRecipes.isLoading = true;
        state.filteredRecipes.error = null;
        state.filteredRecipes.errorData = null;
      })
      .addCase(getFilteredRecipes.fulfilled, (state, action) => {
        const {
          hits,
          page,
          perPage,
          totalPages,
          hasPreviousPage,
          hasNextPage,
          totalItems,
        } = action.payload;

        if (page > 1) {
          state.filteredRecipes.hits = [
            ...(state.filteredRecipes.hits || []),
            ...(hits || []),
          ];
        } else {
          state.filteredRecipes.hits = hits || [];
        }

        state.filteredRecipes.page = page;
        state.filteredRecipes.perPage = perPage;
        state.filteredRecipes.totalPages = totalPages;
        state.filteredRecipes.hasPreviousPage = hasPreviousPage;
        state.filteredRecipes.hasNextPage = hasNextPage;
        state.filteredRecipes.totalItems = totalItems;
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
        state.add.error =
          action.payload?.message ||
          action.error?.message ||
          'Failed to add recipe';
        state.add.success = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.own = initialState.own;
        state.favorites = initialState.favorites;
        state.pagination = initialState.pagination;
      })

      .addCase(fetchRecipesByVariant.rejected, (state, action) => {
        const variant = action.meta.arg.recipeType;
        if (variant === 'own') {
          state.own.isLoading = false;
          state.own.error =
            action.payload?.message ||
            action.error?.message ||
            'Failed to load own recipes';
          state.own.errorData = action.payload ?? null;
        } else {
          state.favorites.error =
            action.payload?.message ||
            action.error?.message ||
            'Failed to toggle favorite status.';
        }
      })

      .addCase(fetchRecipesByVariant.pending, (state, action) => {
        const variant = action.meta.arg.recipeType;
        if (variant === 'own') {
          state.favorites.isLoading = true;
          state.favorites.error = null;
          state.favorites.errorData = null;
        } else {
          state.favorites.isLoading = true;
          state.favorites.error = null;
          state.favorites.errorData = null;
        }
      })
      .addCase(fetchRecipesByVariant.fulfilled, (state, action) => {
        const {
          hits,
          page,
          perPage,
          totalPages,
          hasPreviousPage,
          hasNextPage,
          totalItems,
          variant,
        } = action.payload;
        if (variant === 'own') {
          if (page > 1) {
            state.own.hits = [...(state.own.hits || []), ...(hits || [])];
          } else {
            state.own.hits = hits || [];
          }
          state.own.page = page;
          state.own.perPage = perPage;
          state.own.totalPages = totalPages;
          state.own.hasPreviousPage = hasPreviousPage;
          state.own.hasNextPage = hasNextPage;
          state.own.totalItems = totalItems;
          state.own.isLoading = false;
        } else {
          if (page > 1) {
            state.favorites.hits = [
              ...(state.favorites.hits || []),
              ...(hits || []),
            ];
          } else {
            state.favorites.hits = hits || [];
          }
          state.favorites.page = page;
          state.favorites.perPage = perPage;
          state.favorites.totalPages = totalPages;
          state.favorites.hasPreviousPage = hasPreviousPage;
          state.favorites.hasNextPage = hasNextPage;
          state.favorites.totalItems = totalItems;
          state.favorites.isLoading = false;
        }
      });
  },
});

export default recipesSlice.reducer;
export const { resetHits, setFavoritesPage, setOwnPage } = recipesSlice.actions;
