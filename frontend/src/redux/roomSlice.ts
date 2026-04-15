import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { roomApi, Room, RoomRequest } from '../services/roomApi';

interface RoomState {
  list: Room[];
  nearby: Room[];
  current?: Room;
  loading: boolean;
  error?: string;
}

const initialState: RoomState = { list: [], nearby: [], loading: false };

export const fetchRooms = createAsyncThunk('rooms/fetch', async (params: Record<string, any>) => {
  return roomApi.list(params);
});

export const fetchNearby = createAsyncThunk(
  'rooms/nearby',
  async (p: { lat: number; lng: number; radiusKm: number; maxRent?: number; available?: boolean }) => {
    return roomApi.nearby(p.lat, p.lng, p.radiusKm, {
      maxRent: p.maxRent,
      available: p.available,
    });
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
      .addCase(fetchNearby.pending, (s) => { s.loading = true; })
      .addCase(fetchNearby.fulfilled, (s, a) => { s.loading = false; s.nearby = a.payload; })
      .addCase(fetchNearby.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(createRoom.fulfilled, (s, a) => { s.list.unshift(a.payload); })
      .addCase(fetchRoom.fulfilled, (s, a) => { s.current = a.payload; });
  },
});

export const { clearError } = slice.actions;
export default slice.reducer;
