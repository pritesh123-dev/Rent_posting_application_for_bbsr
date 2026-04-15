import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
