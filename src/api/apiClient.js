import axios from 'axios';

const BASE_URL = 'https://project-recipesback.onrender.com/api/';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const token = {
  set(accessToken, refreshToken) {
    if (accessToken) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem('authToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  },
  unset() {
    apiClient.defaults.headers.common.Authorization = '';
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  },
};

apiClient.interceptors.request.use(
  config => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const clearAuthData = () => {
  token.unset();
};

export default apiClient;
