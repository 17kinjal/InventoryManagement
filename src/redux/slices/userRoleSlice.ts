import { createSlice } from '@reduxjs/toolkit';

interface UserRoleState {
  role: 'admin' | 'user';
}

const initialState: UserRoleState = {
  role: 'admin',
};

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    toggleRole: (state) => {
      state.role = state.role === 'admin' ? 'user' : 'admin';
    },
  },
});

export const { toggleRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
