import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './operations';

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
  isLoaded: false,
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
        state.isLoaded = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isLoaded = true;
      })
      .addCase(getCategories.rejected, state => {
        state.isError = true;
        state.isLoading = false;
        state.isLoaded = false;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
