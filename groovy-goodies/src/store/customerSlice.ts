import { Customer } from '../types/databaseSchema';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Customer = {
  customerId: undefined,
  customerName: undefined,
  customerEmail: undefined,
  customerPhone: undefined,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customerSayHello() {
      console.log('Hello from customer');
    },
  },
});

export const customerActions = customerSlice.actions;

export default customerSlice;
