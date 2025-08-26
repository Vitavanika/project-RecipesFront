import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import recipesReducer from './recipes/slice';
import { filtersReducer } from './filters/slice';
import { categoriesReducer } from './categories/slice';
import { ingredientsReducer } from './ingredients/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    filters: filtersReducer,
    categories: categoriesReducer,
    ingredients: ingredientsReducer,
  },
});
