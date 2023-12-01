import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/databaseSchema';

const initialState = {
  products: [] as Product[],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productSayHello() {
      console.log('Hello from product');
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
