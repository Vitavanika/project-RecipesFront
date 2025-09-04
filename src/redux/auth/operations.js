import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { fetchRecipesByVariant } from '../recipes/operations';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/auth/register', credentials);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message,
        data: error.response?.data?.data,
      });
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      localStorage.setItem('authToken', response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || 'Login failed',
      });
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
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedAccessToken = localStorage.getItem('authToken');
    if (!persistedAccessToken) {
      return thunkAPI.rejectWithValue('No access token available');
    }

    try {
      const { data } = await apiClient.get('/users/current', {
        headers: {
          Authorization: `Bearer ${persistedAccessToken}`,
        },
      });
      thunkAPI.dispatch(
        fetchRecipesByVariant({
          recipeType: 'favorites',
          searchParams: { page: 1, perPage: 12 },
        })
      );
      return data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logOut());
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
