import { createSlice } from '@reduxjs/toolkit';
import { Clerk, Customer } from '../types/databaseSchema';
import { AuthState } from '../types/state';
import {
  authenticateClerk,
  authenticateCustomer,
  registerClerk,
  registerCustomer,
} from './thunks/authThunk';

const initialState: AuthState = {
  token: undefined,
  isAuthenticated: false,
  userId: undefined,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticateCustomer.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(authenticateCustomer.fulfilled, (state, action) => {
      return {
        loading: false,
        token: action.payload.token,
        userId: action.payload.cust_id,
        isAuthenticated: true,
      };
    });
    builder.addCase(authenticateCustomer.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(authenticateClerk.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(authenticateClerk.fulfilled, (state, action) => {
      return {
        loading: false,
        token: action.payload.token,
        userId: action.payload.clerk_id,
        isAuthenticated: true,
      };
    });
    builder.addCase(authenticateClerk.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(registerCustomer.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(registerCustomer.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(registerCustomer.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(registerClerk.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(registerClerk.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(registerClerk.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
