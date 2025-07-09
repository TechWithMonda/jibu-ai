import axios from 'axios';
import router from '@/router';

const api = axios.create({
  baseURL: 'https://web-production-d639.up.railway.app',
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ Attach valid token
    console.log('Token attached to request:', token); // Debug
  } else {
    console.error('No token found! Redirecting to login...');
    router.push('/login');
  }
  
  return config;
});

export default api;