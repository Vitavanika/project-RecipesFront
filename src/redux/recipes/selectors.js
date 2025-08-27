export const selectOwnRecipes = (state) => state.recipes.own.items;
export const selectFavRecipes = (state) => state.recipes.favorites.items;
export const selectLoading = (state) => state.recipes.loading;
export const selectError = (state) => state.recipes.error;

export const selectCategories = (state) => state.recipes.meta.categories;
export const selectIngredients = (state) => state.recipes.meta.ingredients;

export const selectAddRecipeLoading = (state) => state.recipes.add.loading;
export const selectAddRecipeError = (state) => state.recipes.add.error;
export const selectAddRecipeSuccess = (state) => state.recipes.add.success;
