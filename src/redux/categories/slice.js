import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './operations';

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getCategories.rejected, state => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
