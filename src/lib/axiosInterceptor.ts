import axios from 'axios';

let accToken: string | null = null;

export const setAccessToken = (newToken: string) =>
  (accToken = `Bearer ${newToken}`);

export const getAccessToken = () => accToken;

const baseApiUrl = import.meta.env.VITE_BASE_SERVER_URL;

const baseURL = `${baseApiUrl}/api`;

export const publicAxios = axios.create({
  baseURL,
  withCredentials: true,
});

export const privateAxios = axios.create({
  baseURL,
  withCredentials: true,
});

privateAxios.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = accToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.config.url.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop

      try {
        const res = await publicAxios.post('/auth/refresh-token');
        const newToken = res.data.token;
        setAccessToken(newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return privateAxios(originalRequest);
      } catch (refreshError) {
        console.log('refresh error');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
