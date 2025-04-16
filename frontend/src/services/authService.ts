import api from './api'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData extends LoginCredentials {
  name: string
}

interface AuthResponse {
  message: string
  user_id: string
  token: string
  name: string
  email: string
}

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', userData)
    return data
  },

  checkAuth: async (): Promise<AuthResponse> => {
    const { data } = await api.get<AuthResponse>('/auth/me')
    return data
  }
}
