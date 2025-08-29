import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './operations';

const initialState = {
  ingredients: [],
  isLoading: false,
  isError: false,
  isLoaded: false,
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
        state.isLoaded = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isLoaded = true;
      })
      .addCase(getIngredients.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.isLoaded = false;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
