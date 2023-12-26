import { createSlice } from '@reduxjs/toolkit';
import { CustomerState } from '../types/state';
import {
  addNewAddress,
  addNewOrder,
  addNewWishlist,
  addToCart,
  deleteWishlist,
  getAllWishlist,
  getCartItems,
  getCustomerAddress,
  getCustomerCartId,
  getCustomerInfo,
  getCustomerNotifications,
  getCustomerOrders,
  getCustomerShippings,
  getOrderDetail,
  updateSelectedAddress,
} from './thunks/customerThunk';
import { WishListItem } from '../types/response';
import { CustomerAddress } from '../types/databaseSchema';

const initialState: CustomerState = {
  cust_id: undefined,
  cust_name: undefined,
  cust_email: undefined,
  cust_phone: undefined,
  orders: [],
  orderDetail: undefined,
  wishlists: [],
  cartItems: [],
  shipping: [],
  notifications: [],
  address: {} as CustomerAddress,
  cartId: undefined,
  loading: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    unloadOrderDetail(state) {
      state.orderDetail = undefined;
    },
    resetCustomer() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerCartId.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getCustomerCartId.fulfilled, (state, action) => {
      return {
        ...state,
        cartId: action.payload.cart_id,
        loading: false,
      };
    });
    builder.addCase(getCustomerCartId.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getCustomerAddress.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getCustomerAddress.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        address: action.payload,
      };
    });
    builder.addCase(getCustomerAddress.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getCustomerInfo.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getCustomerInfo.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        cust_email: action.payload.cust_email,
        cust_id: action.payload.cust_id,
        cust_name: action.payload.cust_name,
        cust_phone: action.payload.cust_phone,
      };
    });
    builder.addCase(getCustomerInfo.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getAllWishlist.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getAllWishlist.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        wishlists: action.payload,
      };
    });
    builder.addCase(getAllWishlist.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(deleteWishlist.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(deleteWishlist.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(deleteWishlist.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getCartItems.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      };
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getCustomerShippings.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getCustomerShippings.fulfilled, (state, action) => {
      return {
        ...state,
        shipping: action.payload,
        loading: false,
      };
    });
    builder.addCase(getCustomerShippings.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getCustomerNotifications.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    // @ts-ignore
    builder.addCase(getCustomerNotifications.fulfilled, (state, action) => {
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    });
    builder.addCase(getCustomerNotifications.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getCustomerOrders.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getCustomerOrders.fulfilled, (state, action) => {
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    });
    builder.addCase(getCustomerOrders.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(getOrderDetail.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      return {
        ...state,
        orderDetail: action.payload,
        loading: false,
      };
    });
    builder.addCase(getOrderDetail.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addToCart.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addNewAddress.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addNewAddress.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addNewWishlist.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addNewWishlist.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addNewWishlist.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addNewOrder.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(addNewOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(updateSelectedAddress.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(updateSelectedAddress.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(updateSelectedAddress.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export const customerActions = customerSlice.actions;

export default customerSlice;
