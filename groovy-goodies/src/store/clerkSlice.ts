import { createSlice } from '@reduxjs/toolkit';
import { ClerkState } from '../types/state';
import {
  confirmOrder,
  getAllNotification,
  getAllOrders,
  sendNotification,
} from './thunks/clerkThunk';

const initialState: ClerkState = {
  clerk_id: undefined,
  clerk_email: undefined,
  clerk_name: undefined,
  orders: [],
  notifications: [],
  customers: [],
  loading: false,
};

const clerkSlice = createSlice({
  name: 'clerk',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(confirmOrder.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(confirmOrder.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(confirmOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(sendNotification.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(sendNotification.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(sendNotification.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getAllNotification.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // @ts-ignore
    builder.addCase(getAllNotification.fulfilled, (state, action) => {
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    });
    builder.addCase(getAllNotification.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export const clerkActions = clerkSlice.actions;
export default clerkSlice;
