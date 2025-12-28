import axios from 'axios';

const LOCAL_API = 'http://localhost:5000/api';
const PROD_API = 'https://mern-subscription-app.onrender.com/api';

const instance = axios.create({
  baseURL:
    window.location.hostname === 'localhost'
      ? LOCAL_API
      : PROD_API,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
