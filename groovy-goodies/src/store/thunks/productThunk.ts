import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import { Product } from '../../types/databaseSchema';
import {
  AddNewProductRequest,
  DeleteProductRequest,
  EditProductRequest,
} from '../../types/request';

export const getAllProducts = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: ErrorResponse }
>('product/getAllProducts', async (_, thunkApi) => {
  try {
    const req = await axios.get('api/product/all');

    const data = req.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const addNewProduct = createAsyncThunk<
  Product,
  AddNewProductRequest,
  { rejectValue: ErrorResponse }
>(
  'product/addNewProduct',
  async (
    {
      token,
      productName,
      productDescription,
      productImage,
      productPrice,
      productCategory,
    },
    thunkApi
  ) => {
    try {
      const body = {
        productName,
        productDescription,
        productImage,
        productPrice,
        productCategory,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'Application/json',
      };

      const req = await axios.post('api/product', body, { headers });

      const data = req.data;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);

export const updateProduct = createAsyncThunk<
  Product,
  EditProductRequest,
  { rejectValue: ErrorResponse }
>(
  'product/updateProduct',
  async (
    {
      token,
      productId,
      productName,
      productDescription,
      productImage,
      productPrice,
      productCategory,
    },
    thunkApi
  ) => {
    try {
      const body = {
        productId,
        productName,
        productDescription,
        productImage,
        productPrice,
        productCategory,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'Application/json',
      };

      const req = await axios.put('api/product/update', body, { headers });

      const data = req.data;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);

export const deleteProduct = createAsyncThunk<
  { affectedRows: number },
  DeleteProductRequest,
  { rejectValue: ErrorResponse }
>('product/deleteProduct', async ({ token, productId }, thunkApi) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const req = await axios.delete(`api/product/${productId}`, {
      headers,
    });

    const data = req.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});
