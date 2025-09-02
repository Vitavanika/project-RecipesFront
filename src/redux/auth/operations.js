import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFavRecipes } from '../recipes/operations';
import apiClient, { clearAuthData } from '../../api/apiClient';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/auth/register', credentials);
      return response.data.data;
    } catch (error) {
      const serverMessage =
        error.response?.data?.data?.message ||
        error.response?.data?.message ||
        'Registration failed';

      return thunkAPI.rejectWithValue(serverMessage);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    // Logout навіть якщо запит не вдався
  } finally {
    clearAuthData();
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const response = await apiClient.get('/users/current');
       thunkAPI.dispatch(fetchFavRecipes());
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
