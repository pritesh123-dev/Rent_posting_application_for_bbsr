import { createSlice } from '@reduxjs/toolkit';

interface UIState { initialized: boolean; }
const initialState: UIState = { initialized: false };

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    init: (s) => { s.initialized = true; },
  },
});

export const { init } = slice.actions;
export default slice.reducer;
