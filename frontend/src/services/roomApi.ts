import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('jwt');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export interface Room {
  id: string;
  name: string;
  phone: string;
  rent: number;
  city: string;
  latitude: number;
  longitude: number;
  isAvailable: boolean;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  distanceKm?: number;
}

export interface RoomRequest {
  name: string;
  phone: string;
  rent: number;
  city: string;
  latitude: number;
  longitude: number;
  isAvailable: boolean;
  description?: string;
  imageUrl?: string;
}

export const roomApi = {
  create: (body: RoomRequest) => api.post('/rooms', body).then((r) => r.data.data as Room),
  list: (params: Record<string, any>) =>
    api.get('/rooms', { params }).then((r) => r.data.data),
  nearby: (lat: number, lng: number, radiusKm = 5, filters: Record<string, any> = {}) =>
    api.get('/rooms/nearby', { params: { lat, lng, radiusKm, ...filters } })
       .then((r) => r.data.data as Room[]),
  get: (id: string) => api.get(`/rooms/${id}`).then((r) => r.data.data as Room),
  updateAvailability: (id: string, isAvailable: boolean) =>
    api.patch(`/rooms/${id}/availability`, { isAvailable }).then((r) => r.data.data as Room),
  stats: () => api.get('/rooms/stats').then((r) => r.data.data),
};
