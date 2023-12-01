import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ClerkAuthResponse,
  CustomerAuthResponse,
  RegisterCustomerResponse,
} from '../../types/response';
import {
  AuthRequest,
  RegisterClerkRequest,
  RegisterCustomerRequest,
} from '../../types/request';
import { ErrorResponse } from 'react-router-dom';
import { authActions } from '../authSlice';

// Note: createAsyncThunk config --> retType, paramType, { opt... }

export const authenticateCustomer = createAsyncThunk<
  CustomerAuthResponse,
  AuthRequest,
  { rejectValue: ErrorResponse }
>('auth/authenticateCustomer', async ({ email, password }, thunkApi) => {
  // Send request to backend API
  try {
    const req = await axios.post('api/auth/customer-login', {
      email,
      password,
    });

    const data = req.data;

    return data;
    // Note: the further step will be handled in the main authState slice file
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const authenticateClerk = createAsyncThunk<
  ClerkAuthResponse,
  AuthRequest,
  { rejectValue: ErrorResponse }
>('auth/authenticateClerk', async ({ email, password }, thunkApi) => {
  try {
    const req = await axios.post('api/auth/clerk-login', {
      email,
      password,
    });

    return req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const registerCustomer = createAsyncThunk<
  undefined,
  RegisterCustomerRequest,
  { rejectValue: ErrorResponse }
>(
  'auth/registerCustomer',
  async ({ name, phone, email, password }, thunkApi) => {
    try {
      await axios.post('api/customer/register', {
        name,
        phone,
        email,
        password,
      });

      // Todo: upon succession, update state in notification using thunkApi
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);

export const registerClerk = createAsyncThunk<
  undefined,
  RegisterClerkRequest,
  { rejectValue: ErrorResponse }
>('auth/registerClerk', async ({ name, email, password }, thunkApi) => {
  try {
    await axios.post('api/clerk/register', {
      name,
      email,
      password,
    });

    // Todo: upon succession, update state in notification using thunkApi
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});
