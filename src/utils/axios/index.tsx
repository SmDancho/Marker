import axios from 'axios';
export const instance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? import.meta.env.VITE_REQUEST_URl : import.meta.env.VITE_PROD_URL,
  timeout: 1000,
});
