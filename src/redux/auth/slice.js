import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';
import { toggleFavoriteRecipe } from '../recipes/operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error =
    action.payload?.message || action.error?.message || 'Unknown error';
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
        const { user, accessToken } = action.payload || {};
        if (user) {
          state.user = {
            name: user.name,
            email: user.email,
            favorites: user.favorites ?? [],
          };
          state.token = accessToken;
          state.isLoggedIn = true;
          state.isLoading = false;
          state.error = null;
        }
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
        const { user } = action.payload || {};
        if (user) {
          state.user = {
            name: user?.name,
            email: user?.email,
            favorites: user?.favorites ?? [],
          };
          state.isLoggedIn = true;
          state.isRefreshing = false;
        } else {
          state.isLoggedIn = false;
          state.token = null;
          state.isRefreshing = false;
          state.user = { name: null, email: null, favorites: [] };
        }
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.token = null;
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
