export const getSearchPhrase = state => state.filters.searchPhrase;
export const getSelectedCategory = state => state.filters.selectedCategory;
export const getSelectedIngredients = state =>
  state.filters.selectedIngredients;
export const getIsLoading = state => state.filters.isLoading;
export const getHasRecipes = state => state.filters.hasRecipes;
export const isMultiselectCategory = state =>
  state.filters.isMultiselectCategory;
export const isMultiselectIngredients = state =>
  state.filters.isMultiselectIngredients;
