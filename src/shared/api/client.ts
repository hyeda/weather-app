import axios from 'axios';
import { OWM_API_KEY, OWM_BASE_URL } from '../config/env';

const apiClient = axios.create({
  baseURL: OWM_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  config.params = { ...config.params, appid: OWM_API_KEY };
  return config;
});

export default apiClient;