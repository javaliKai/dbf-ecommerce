import { createSlice } from '@reduxjs/toolkit';
import { addNewProduct, getAllProducts } from './thunks/productThunk';
import { ProductState } from '../types/state';

const initialState: ProductState = {
  products: [],
  loading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addNewProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addNewProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export const productActions = productSlice.actions;

export default productSlice;
