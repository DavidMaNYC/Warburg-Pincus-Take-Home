// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
interface IUserState {
  createdat: Date | null;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
}
const initialState: IUserState = {
  createdat: null,
  email: '',
  firstname: '',
  id: '',
  lastname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
