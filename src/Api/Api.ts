/* eslint-disable no-param-reassign */

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://191.252.220.226:3334',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
