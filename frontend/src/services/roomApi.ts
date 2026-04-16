import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(new Error(err.response?.data?.message || err.message || 'Network error')),
);

export interface Room {
  id: string;
  name: string;
  phone: string;
  rent: number;
  city: string;
  area?: string;
  latitude: number;
  longitude: number;
  isAvailable: boolean;
  roomType?: string;
  furnishing?: string;
  amenities?: string;
  verified?: boolean;
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
  area?: string;
  latitude: number;
  longitude: number;
  isAvailable: boolean;
  roomType?: string;
  furnishing?: string;
  amenities?: string;
  description?: string;
  imageUrl?: string;
}

export const ROOM_TYPES = ['1BHK', '2BHK', '3BHK', 'SINGLE', 'PG', 'STUDIO'] as const;
export const FURNISHING = ['FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED'] as const;
export const AMENITY_OPTIONS = [
  'AC', 'WiFi', 'Parking', 'Geyser', 'Washing Machine', 'TV', 'Fridge',
  'Power Backup', 'Lift', 'Gym', 'CCTV', 'Modular Kitchen', 'Balcony',
  'Meals', 'Laundry', 'Housekeeping', 'Security',
] as const;

export const roomApi = {
  create: (body: RoomRequest) =>
    api.post('/rooms', body).then((r) => r.data.data as Room),
  list: (params: Record<string, any>) =>
    api.get('/rooms', { params }).then((r) => r.data.data),
  nearby: (lat: number, lng: number, radiusKm = 10, filters: Record<string, any> = {}) =>
    api.get('/rooms/nearby', { params: { lat, lng, radiusKm, ...filters } })
       .then((r) => r.data.data as Room[]),
  get: (id: string) =>
    api.get(`/rooms/${id}`).then((r) => r.data.data as Room),
  updateAvailability: (id: string, isAvailable: boolean) =>
    api.patch(`/rooms/${id}/availability`, { isAvailable }).then((r) => r.data.data as Room),
  stats: () =>
    api.get('/rooms/stats').then((r) => r.data.data),
};

// Shortlist (client-side via localStorage)
export const shortlist = {
  get: (): string[] => JSON.parse(localStorage.getItem('shortlist') || '[]'),
  has: (id: string): boolean => shortlist.get().includes(id),
  toggle: (id: string): boolean => {
    const list = shortlist.get();
    const idx = list.indexOf(id);
    if (idx >= 0) { list.splice(idx, 1); } else { list.push(id); }
    localStorage.setItem('shortlist', JSON.stringify(list));
    return idx < 0;
  },
  count: (): number => shortlist.get().length,
};
