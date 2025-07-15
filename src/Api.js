import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-ej4d.onrender.com/api',
});

export default api;
