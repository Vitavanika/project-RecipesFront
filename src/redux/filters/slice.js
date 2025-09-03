import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchPhrase: '',
  selectedCategory: '',
  selectedIngredients: '',
  page: 1,
  perPage: 12,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchPhrase(state, action) {
      state.searchPhrase = action.payload;
      state.page = 1;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      state.page = 1;
    },
    setSelectedIngredients(state, action) {
      state.selectedIngredients = action.payload;
      state.page = 1;
    },
    setAllFilters(state, action) {
      state.searchPhrase = action.payload.searchPhrase ?? '';
      state.selectedCategory = action.payload.category ?? '';
      state.selectedIngredients = action.payload.ingredients ?? '';
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
    },
    resetFilters(state) {
      state.selectedCategory = '';
      state.selectedIngredients = '';
      state.searchPhrase = '';
      state.page = 1;
      state.perPage = 12;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPerPage(state, action) {
      state.perPage = action.payload;
    },
    setPaginationParams(state, action) {
      state.page = action.payload;
      state.perPage = action.payload;
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
  setPage,
  setPerPage,
  setPaginationParams,
} = filtersSlice.actions;
