export const selectOwnRecipes = state => state.recipes.own.items;
export const selectFavRecipes = state => state.recipes.favorites.items;
export const selectFilteredRecipes = state => state.recipes.filteredRecipes;
export const selectFavLoading = state => state.recipes.favorites.isLoading;
export const selectLoading = state => state.recipes.filteredRecipes.isLoading;
export const selectOwnError = state => state.recipes.own.error;
export const selectFavError = state => state.recipes.favorites.error;
export const selectError = state => state.recipes.error;
export const getTotalRecipes = state => state.recipes.pagination.totalItems;
export const getCurrentPage = state => state.recipes.pagination.page;
export const getPerPage = state => state.recipes.pagination.perPage;
export const getTotalPages = state => state.recipes.pagination.totalPages;
export const getRecipes = state => state.recipes.pagination.hits;
export const hasNextPage = state => state.recipes.pagination.hasNextPage;
export const hasPreviousPage = state =>
  state.recipes.pagination.hasPreviousPage;

export const selectAddRecipeLoading = state => state.recipes.add.loading;
export const selectAddRecipeError = state => state.recipes.add.error;
export const selectAddRecipeSuccess = state => state.recipes.add.success;
export const selectOwnRecipesLoading = state => state.recipes.own.isLoading;
export const selectFavRecipesLoading = state =>
  state.recipes.favorites.isLoading;
