import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchPhrase: '',
  selectedCategory: '',
  selectedIngredients: '',
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
      state.selectedCategory = action.payload.category ?? '';

      state.selectedIngredients = action.payload.ingredients ?? '';
    },
    resetFilters(state) {
      state.selectedCategory = '';
      state.selectedIngredients = '';
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
