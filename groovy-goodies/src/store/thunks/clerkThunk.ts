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

export const getAllOrders = createAsyncThunk<
  Order[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getAllOrders', async (token, thunkApi) => {
  try {
    const req = await axios.get('api/clerk/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = req.data;
    console.log(data);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const confirmOrder = createAsyncThunk<
  ConfirmOrderResponse,
  ConfirmOrderRequest,
  { rejectValue: ErrorResponse }
>('customer/confirmOrder', async ({ token, orderId }, thunkApi) => {
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
    console.log(data);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const sendNotification = createAsyncThunk<
  SendNotificationResponse,
  SendNotificationRequest,
  { rejectValue: ErrorResponse }
>(
  'customer/sendNotification',
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
      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);

export const getAllNotification = createAsyncThunk<
  Notification[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getAllNotification', async (token, thunkApi) => {
  try {
    const req = await axios.get('api/clerk/notification', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = req.data;
    console.log(data);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});
