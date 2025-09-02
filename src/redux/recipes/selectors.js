export const selectOwnRecipes = state => state.recipes.own.items;
export const selectFavRecipes = state => state.recipes.favorites.items;
export const selectFilteredRecipes = state => state.recipes.filteredRecipes;
export const selectFavLoading = (state) => state.recipes.favorites.isLoading;
export const selectLoading = state => state.recipes.filteredRecipes.isLoading;
export const selectOwnError = (state) => state.recipes.own.error;
export const selectFavError = (state) => state.recipes.favorites.error;
export const selectError = (state) => state.recipes.error;
export const getTotalRecipes = state =>
  state.recipes.filteredRecipes.totalItems;
export const getCurrentPage = state => state.recipes.filteredRecipes.page;
export const getPerPage = state => state.recipes.filteredRecipes.perPage;
export const getTotalPages = state => state.recipes.filteredRecipes.totalPages;
export const getRecipes = state => state.recipes.filteredRecipes.hits;
export const hasNextPage = state => state.recipes.filteredRecipes.hasNextPage;
export const hasPreviousPage = state =>
  state.recipes.filteredRecipes.hasPreviousPage;

export const selectAddRecipeLoading = (state) => state.recipes.add.loading;
export const selectAddRecipeError = (state) => state.recipes.add.error;
export const selectAddRecipeSuccess = (state) => state.recipes.add.success;
export const getIsLoading = state => state.recipes.own.isLoading || state.recipes.favorites.isLoading;