//---------favorites-----------------
export const getFavorites = state => state.recipes.favorites;
export const selectFavLoading = state => state.recipes.favorites.isLoading;
export const getFavoritesTotalRecipes = state =>
  state.recipes.favorites.totalItems;
export const getFavoritesCurrentPage = state => state.recipes.favorites.page;
export const getFavoritesPerPage = state => state.recipes.favorites.perPage;
export const getFavoritesTotalPages = state =>
  state.recipes.favorites.totalPages;
export const getFavoritesRecipes = state => state.recipes.favorites.hits;
export const hasFavoritesNextPage = state =>
  state.recipes.favorites.hasNextPage;
export const hasFavoritesPreviousPage = state =>
  state.recipes.favorites.hasPreviousPage;
export const getFavoritesError = state => state.recipes.favorites.error;
export const getFavoritesRecipesLoading = state =>
  state.recipes.favorites.isLoading;
export const getFavoritesErrorData = state => state.recipes.favorites.errorData;

//------------own--------------------
export const getOwn = state => state.recipes.own;
export const getOwnError = state => state.recipes.own.error;
export const getOwnRecipesLoading = state => state.recipes.own.isLoading;
export const getOwnTotalRecipes = state => state.favorites.own.totalItems;
export const getOwnCurrentPage = state => state.recipes.own.page;
export const getOwnPerPage = state => state.recipes.own.perPage;
export const getOwnTotalPages = state => state.recipes.own.totalPages;
export const getOwnRecipes = state => state.recipes.own.hits;
export const hasOwnNextPage = state => state.recipes.own.hasNextPage;
export const hasOwnPreviousPage = state => state.recipes.own.hasPreviousPage;
export const getOwnErrorData = state => state.recipes.own.errorData;

//----------filtered-----------------
export const selectFilteredRecipes = state => state.recipes.filteredRecipes;
export const getFilteredCurrentPage = state =>
  state.recipes.filteredRecipes.page;
export const getFilteredPerPage = state =>
  state.recipes.filteredRecipes.perPage;
export const getFilteredTotalPages = state =>
  state.recipes.filteredRecipes.totalPages;
export const getFilteredTotalRecipes = state =>
  state.recipes.filteredRecipes.totalItems;
export const getFilteredRecipes = state => state.recipes.filteredRecipes.hits;
export const hasFilteredNextPage = state =>
  state.recipes.filteredRecipes.hasNextPage;
export const hasFilteredPreviousPage = state =>
  state.recipes.filteredRecipes.hasPreviousPage;
export const getFilteredLoading = state =>
  state.recipes.filteredRecipes.isLoading;

//---------------add-------------------
export const selectAddRecipeLoading = state => state.recipes.add.loading;
export const selectAddRecipeError = state => state.recipes.add.error;
export const selectAddRecipeSuccess = state => state.recipes.add.success;
