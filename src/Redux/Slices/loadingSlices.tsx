import { createSlice } from '@reduxjs/toolkit';

interface IInitialLoading {
  isLoading: boolean;
}

const initialState: IInitialLoading = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    resetLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, resetLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
