import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../types/databaseSchema';
import { ErrorResponse } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import {
  ConfirmOrderResponse,
  SendNotificationResponse,
} from '../../types/response';
import {
  ConfirmOrderRequest,
  SendNotificationRequest,
} from '../../types/request';
import { uiSliceActions } from '../uiSlice';

export const getAllOrders = createAsyncThunk<
  Order[],
  string,
  { rejectValue: ErrorResponse }
>('clerk/getAllOrders', async (token, thunkApi) => {
  try {
    const req = await axios.get('api/clerk/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = req.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const confirmOrder = createAsyncThunk<
  ConfirmOrderResponse,
  ConfirmOrderRequest,
  { rejectValue: ErrorResponse }
>('clerk/confirmOrder', async ({ token, orderId }, thunkApi) => {
  try {
    const req = await axios.put(
      `api/clerk/order/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = req.data;

    thunkApi.dispatch(
      uiSliceActions.setAlert(`OrderId: ${orderId} is Confirmed`)
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const sendNotification = createAsyncThunk<
  SendNotificationResponse,
  SendNotificationRequest,
  { rejectValue: ErrorResponse }
>(
  'clerk/sendNotification',
  async ({ token, customerId, message }, thunkApi) => {
    try {
      const body = {
        customerId,
        message,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const req = await axios.post('api/clerk/notification', body, {
        headers,
      });

      const data = req.data;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);

export const getAllNotification = createAsyncThunk<
  Notification[],
  string,
  { rejectValue: ErrorResponse }
>('clerk/getAllNotification', async (token, thunkApi) => {
  try {
    const req = await axios.get('api/clerk/notification', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = req.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});
