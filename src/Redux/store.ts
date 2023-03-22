import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/userSlices';
import loadingSlice from './Slices/loadingSlices';
import toastSlice from './Slices/toastSlices';

const store = configureStore({
  reducer: {
    user: userSlice,
    loading: loadingSlice,
    toastState: toastSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
