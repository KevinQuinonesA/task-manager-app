import axios from 'axios'
import { useAuthStore } from '../store/authStore.ts'

const API_URL = 'https://n8rzweu3s6.execute-api.us-east-1.amazonaws.com/dev'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',

  }
})

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
