import axios from 'axios';
export const instance = axios.create({
  baseURL: import.meta.env.VITE_PROD_URL,
  timeout: 1000,
});
