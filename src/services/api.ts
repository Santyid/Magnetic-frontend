import axios from 'axios';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
  UserProduct,
  SSOAccessResponse,
  AssignProductData,
  CreateUserData,
  Product,
  ChatMessage,
  ChatResponse,
  ConnectProductData,
  ConnectProductResponse,
  MetricsResponse,
  MetricsItem,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores y refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });

          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  register: async (userData: RegisterData): Promise<User> => {
    const { data } = await api.post<User>('/auth/register', userData);
    return data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await api.post('/auth/logout', { refreshToken });
  },

  me: async (): Promise<User> => {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    return data;
  },
};

// Products endpoints
export const productsAPI = {
  getMyProducts: async (): Promise<UserProduct[]> => {
    const { data } = await api.get<UserProduct[]>('/products');
    return data;
  },

  getAccessToken: async (slug: string): Promise<SSOAccessResponse> => {
    const { data} = await api.get<SSOAccessResponse>(
      `/products/${slug}/access`
    );
    return data;
  },

  getAllProducts: async (): Promise<Product[]> => {
    const { data } = await api.get<Product[]>('/products/all');
    return data;
  },

  assignProduct: async (userId: string, assignData: AssignProductData): Promise<UserProduct> => {
    const { data } = await api.post<UserProduct>(`/products/assign/${userId}`, assignData);
    return data;
  },

  removeUserProduct: async (userProductId: string): Promise<void> => {
    await api.delete(`/products/user-product/${userProductId}`);
  },

  saveCredentials: async (userProductId: string, data: ConnectProductData): Promise<UserProduct> => {
    const { data: result } = await api.post<UserProduct>(`/products/credentials/${userProductId}`, data);
    return result;
  },

  deleteCredentials: async (userProductId: string): Promise<UserProduct> => {
    const { data } = await api.delete<UserProduct>(`/products/credentials/${userProductId}`);
    return data;
  },
};

// Users endpoints (Admin)
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  getOne: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  create: async (userData: CreateUserData): Promise<User> => {
    const { data } = await api.post<User>('/users', userData);
    return data;
  },

  update: async (id: string, userData: Partial<CreateUserData>): Promise<User> => {
    const { data } = await api.patch<User>(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  getProducts: async (userId: string): Promise<UserProduct[]> => {
    const { data } = await api.get<UserProduct[]>(`/users/${userId}/products`);
    return data;
  },
};

// AI endpoints
// Dashboard endpoints (connection + metrics)
export const dashboardAPI = {
  connectProduct: async (userProductId: string, data: ConnectProductData): Promise<ConnectProductResponse> => {
    const { data: result } = await api.post<ConnectProductResponse>(`/dashboard/connect/${userProductId}`, data);
    return result;
  },

  disconnectProduct: async (userProductId: string): Promise<void> => {
    await api.delete(`/dashboard/connect/${userProductId}`);
  },

  getMetrics: async (): Promise<MetricsResponse> => {
    const { data } = await api.get<MetricsResponse>('/dashboard/metrics');
    return data;
  },

  syncProduct: async (userProductId: string): Promise<MetricsItem> => {
    const { data } = await api.post<MetricsItem>(`/dashboard/sync/${userProductId}`);
    return data;
  },
};

export const aiAPI = {
  sendMessage: async (message: string, history?: ChatMessage[]): Promise<ChatResponse> => {
    const { data } = await api.post<ChatResponse>('/ai/chat', { message, history });
    return data;
  },
};

// Health endpoint
export const healthAPI = {
  check: async (): Promise<{ status: string; timestamp: string; service: string; uptime: number }> => {
    const { data } = await api.get('/health');
    return data;
  },
};

export default api;
