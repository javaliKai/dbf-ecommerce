import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux/es/types';
import customerSlice from './customerSlice';
import productSlice from './productSlice';
import authSlice from './authSlice';
import clerkSlice from './clerkSlice';

const store = configureStore({
  reducer: {
    customer: customerSlice.reducer,
    product: productSlice.reducer,
    auth: authSlice.reducer,
    clerk: clerkSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Meaning: useAppDispatch is a function that should return AppDispatch as the type
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
