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
      state.selectedCategory = action.payload;
    },
    setSelectedIngredients(state, action) {
      state.selectedIngredients = action.payload;
    },
    setAllFilters(state, action) {
      state.searchPhrase = action.payload.searchPhrase ?? '';
      state.selectedCategory = Array.isArray(action.payload.category)
        ? action.payload.category
        : action.payload.category
        ? [action.payload.category]
        : [];

      state.selectedIngredients = Array.isArray(action.payload.ingredients)
        ? action.payload.ingredients
        : action.payload.ingredients
        ? [action.payload.ingredients]
        : [];
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
  setAllFilters,
} = filtersSlice.actions;
