import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://smartsociety-backend.vercel.app'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('society_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getErrorMessage = (error) =>
  error.response?.data?.message || 'Something went wrong. Please try again.';

export default api;
