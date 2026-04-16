import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { roomApi, Room, RoomRequest } from '../services/roomApi';

interface RoomState {
  list: Room[];
  nearby: Room[];
  allRooms: Room[];
  current?: Room;
  loading: boolean;
  error?: string;
  totalPages: number;
}

const initialState: RoomState = {
  list: [], nearby: [], allRooms: [], loading: false, totalPages: 0,
};

export const fetchRooms = createAsyncThunk('rooms/fetch', async (params: Record<string, any>) => {
  return roomApi.list(params);
});

export const fetchNearby = createAsyncThunk(
  'rooms/nearby',
  async (p: { lat: number; lng: number; radiusKm: number; maxRent?: number; available?: boolean }) => {
    const filters: Record<string, any> = {};
    if (p.maxRent !== undefined) filters.maxRent = p.maxRent;
    if (p.available !== undefined) filters.available = p.available;
    return roomApi.nearby(p.lat, p.lng, p.radiusKm, filters);
  },
);

export const fetchAllRooms = createAsyncThunk(
  'rooms/all',
  async (p: { city?: string; minRent?: number; maxRent?: number; available?: boolean; page?: number; size?: number }) => {
    const params: Record<string, any> = { page: p.page ?? 0, size: p.size ?? 50 };
    if (p.city) params.city = p.city;
    if (p.minRent !== undefined) params.minRent = p.minRent;
    if (p.maxRent !== undefined) params.maxRent = p.maxRent;
    if (p.available !== undefined) params.available = p.available;
    return roomApi.list(params);
  },
);

export const createRoom = createAsyncThunk('rooms/create', async (body: RoomRequest) => {
  return roomApi.create(body);
});

export const fetchRoom = createAsyncThunk('rooms/one', async (id: string) => {
  return roomApi.get(id);
});

const slice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    clearError: (s) => { s.error = undefined; },
  },
  extraReducers: (b) => {
    b.addCase(fetchRooms.pending, (s) => { s.loading = true; s.error = undefined; })
      .addCase(fetchRooms.fulfilled, (s, a: PayloadAction<any>) => {
        s.loading = false;
        s.list = a.payload?.content ?? [];
      })
      .addCase(fetchRooms.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(fetchNearby.pending, (s) => { s.loading = true; s.error = undefined; })
      .addCase(fetchNearby.fulfilled, (s, a) => { s.loading = false; s.nearby = a.payload ?? []; })
      .addCase(fetchNearby.rejected, (s, a) => { s.loading = false; s.error = a.error.message; s.nearby = []; })

      .addCase(fetchAllRooms.pending, (s) => { s.loading = true; s.error = undefined; })
      .addCase(fetchAllRooms.fulfilled, (s, a: PayloadAction<any>) => {
        s.loading = false;
        s.allRooms = a.payload?.content ?? [];
        s.totalPages = a.payload?.totalPages ?? 0;
      })
      .addCase(fetchAllRooms.rejected, (s, a) => { s.loading = false; s.error = a.error.message; s.allRooms = []; })

      .addCase(createRoom.fulfilled, (s, a) => {
        s.list.unshift(a.payload);
        s.allRooms.unshift(a.payload);
      })
      .addCase(fetchRoom.pending, (s) => { s.loading = true; })
      .addCase(fetchRoom.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
      .addCase(fetchRoom.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
  },
});

export const { clearError } = slice.actions;
export default slice.reducer;
