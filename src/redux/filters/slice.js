import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchPhrase: '',
  selectedCategory: [],
  selectedIngredients: [],
  isLoading: false,
  hasRecipes: false,
  loadingIngredients: false,
  loadingCategories: false,
  isMultiselectCategory: false,
  isMultiselectIngredients: false,
  isError: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchPhrase(state, action) {
      state.searchPhrase = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory.push(action.payload);
    },
    setSelectedIngredients(state, action) {
      state.selectedIngredients.push(action.payload);
    },
    resetFilters() {
      return {
        ...initialState,
        selectedCategory: [],
        selectedIngredients: [],
      };
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const {
  setSearchPhrase,
  setSelectedCategory,
  setSelectedIngredients,
  resetFilters,
} = filtersSlice.actions;
