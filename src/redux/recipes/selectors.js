export const selectOwnRecipes = (state) => state.recipes.own.items;
export const selectFavRecipes = (state) => state.recipes.favorites.items;
export const selectLoading = (state) => state.recipes.loading;
export const selectError = (state) => state.recipes.error;
