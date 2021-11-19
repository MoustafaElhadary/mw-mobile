import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tabReducer from './tabSlice';
import registrationReducer from './registrationSlice';

const store = configureStore({
  reducer: {
    ui: tabReducer,
    registration: registrationReducer,

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
