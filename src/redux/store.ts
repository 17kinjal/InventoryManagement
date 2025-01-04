import { configureStore } from '@reduxjs/toolkit';
import userRoleReducer from './slices/userRoleSlice';
import inventoryReducer from './slices/inventorySlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    userRole: userRoleReducer,
    inventory: inventoryReducer,
    modal: modalReducer
  },
});

// Types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
