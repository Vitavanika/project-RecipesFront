import axios from 'axios';

const BASE_URL = 'https://project-recipesback.onrender.com/api/';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
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
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken'); // Якщо отримано 401, і це не запит на refresh

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Якщо вже йде оновлення, додаємо запит у чергу
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${BASE_URL}auth/refresh`, {
          refreshToken,
        });
        const { accessToken } = response.data.data;

        localStorage.setItem('authToken', accessToken);
        apiClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        processQueue(null, accessToken); // Повторюємо оригінальний запит

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Якщо оновлення не вдалося, очищаємо дані та перенаправляємо
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
