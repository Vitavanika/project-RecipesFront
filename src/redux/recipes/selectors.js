export const selectOwnRecipes = state => state.recipes.own.items;
export const selectFavRecipes = state => state.recipes.favorites.items;
export const selectFilteredRecipes = state => state.recipes.filteredRecipes;
export const selectLoading = state => state.recipes.filteredRecipes.isLoading;
export const selectError = state => state.recipes.error;
export const getTotalRecipes = state =>
  state.recipes.filteredRecipes.totalItems;
export const getCurrentPage = state => state.recipes.filteredRecipes.page;
export const getPerPage = state => state.recipes.filteredRecipes.perPage;
export const getTotalPages = state => state.recipes.filteredRecipes.totalPages;
export const getRecipes = state => state.recipes.filteredRecipes.hits;
export const hasNextPage = state => state.recipes.filteredRecipes.hasNextPage;
export const hasPreviousPage = state =>
  state.recipes.filteredRecipes.hasPreviousPage;
