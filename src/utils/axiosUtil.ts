import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5271/api',
});

export default axiosInstance;