import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import recipesReducer from './recipes/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ingredientsReducer } from './ingredients/slice';
import { categoriesReducer } from './categories/slice';

const authPersistConfig = { key: 'auth', storage, whitelist: ['token'] };

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
    categories: categoriesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
