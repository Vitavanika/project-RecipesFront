import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
import { toggleFavoriteRecipe } from '../recipes/operations'

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  user: { name: null, email: null, favorites: [] },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
          favorites: action.payload.user.favorites ?? [],
        };
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logIn.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null, favorites: [] };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOut.rejected, handleRejected)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
          favorites: action.payload.user.favorites ?? [],
        };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.error = 'Refresh failed';
      })
      .addCase(toggleFavoriteRecipe.fulfilled, (state, action) => {
        const { recipeId, isFavorite } = action.payload;

        if (isFavorite) {
          if (!state.user.favorites.includes(recipeId)) {
            state.user.favorites.push(recipeId);
          }
        } else {
          state.user.favorites = state.user.favorites.filter(
            id => id !== recipeId
          );
        }
      }),
});

export const authReducer = authSlice.reducer;
