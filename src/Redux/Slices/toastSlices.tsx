import { createSlice } from '@reduxjs/toolkit';

export enum toastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  Null = 'null',
}

interface IInitialtToast {
  toastShown: boolean;
  toastMessage: string;
  toastType: toastType;
}

const initialState: IInitialtToast = {
  toastShown: false,
  toastMessage: '',
  toastType: toastType.Null,
};

const toastSlice = createSlice({
  name: 'toastState',
  initialState,
  reducers: {
    showToast: (state) => {
      state.toastShown = true;
    },
    closeToast: (state) => {
      state.toastShown = false;
    },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type;
    },
  },
});

export const { showToast, closeToast, setToastMessage } = toastSlice.actions;

export default toastSlice.reducer;
