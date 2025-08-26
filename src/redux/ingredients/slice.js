import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './operations';

const initialState = {
  ingredients: [],
  isLoading: false,
  isError: false,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getIngredients.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getIngredients.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
