import { createSlice } from '@reduxjs/toolkit';

interface UIState { darkMode: boolean; }
const initialState: UIState = { darkMode: localStorage.getItem('dark') === '1' };

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDark: (s) => {
      s.darkMode = !s.darkMode;
      localStorage.setItem('dark', s.darkMode ? '1' : '0');
      document.documentElement.classList.toggle('dark', s.darkMode);
    },
    initDark: (s) => {
      document.documentElement.classList.toggle('dark', s.darkMode);
    },
  },
});

export const { toggleDark, initDark } = slice.actions;
export default slice.reducer;
