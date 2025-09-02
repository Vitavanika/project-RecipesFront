import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient, { token } from '../../api/apiClient';

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
      token.set(accessToken, refreshToken);
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
    console.error('Logout failed on server', error);
  } finally {
    token.unset();
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
      // Встановлюємо токени з localStorage для первинного запиту
      token.set(persistedAccessToken, persistedRefreshToken);

      const response = await apiClient.get('/users/current');
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          //Оновлюємо токени
          const refreshResponse = await apiClient.post('/auth/refresh', {
            refreshToken: persistedRefreshToken,
          });
          const { accessToken: newAccessToken } = refreshResponse.data.data;

          // Встановлюємо нові токени
          token.set(newAccessToken, persistedRefreshToken);

          // Повторюємо запит
          const userResponse = await apiClient.get('/users/current');
          return userResponse.data.data;
        } catch (refreshError) {
          // Якщо оновлення не вдалось, видаляємо токени і повертаємо помилку
          token.unset();
          return thunkAPI.rejectWithValue(refreshError.message);
        }
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);