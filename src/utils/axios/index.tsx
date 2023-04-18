import axios from 'axios';
export const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_URl,
  timeout: 1000,
});
