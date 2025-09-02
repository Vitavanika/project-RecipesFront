import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/auth/register', credentials);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      localStorage.setItem('authToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    console.error('Logout failed on server', error);
  } finally {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedAccessToken = localStorage.getItem('authToken');
    const persistedRefreshToken = localStorage.getItem('refreshToken');

    if (!persistedAccessToken || !persistedRefreshToken) {
      return thunkAPI.rejectWithValue('No tokens available');
    }

    try {
      // Якщо токени існують, робимо запит. apiClient сам оновиться, якщо токен прострочений.
      const response = await apiClient.get('/users/current');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
