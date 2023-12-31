import axios, { AxiosError } from 'axios';
import {
  CartItem,
  ErrorResponse,
  NewOrderResponse,
  NewWishlistResponse,
  OrderDetail,
  SelectAddressResponse,
  ShippingItem,
  WishListItem,
} from '../../types/response';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Customer,
  CustomerAddress,
  Notification,
  Order,
} from '../../types/databaseSchema';
import {
  AddOrderRequest,
  AddToCartRequest,
  DeleteCartItemRequest,
  NewAddressRequest,
  NewWishlistRequest,
  OrderDetailRequest,
  SelectAddressRequest,
  UpdateCustomerRequest,
} from '../../types/request';
import { uiSliceActions } from '../uiSlice';
import { authActions } from '../authSlice';

export const getCustomerCartId = createAsyncThunk<
  // GetAllWishlistResponse,
  { cart_id: number },
  string,
  { rejectValue: ErrorResponse }
>('customer/getCustomerCartId', async (token, thunkApi) => {
  try {
    const req = await axios.get(`/api/customer/cart-id`, {
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
export const getCustomerInfo = createAsyncThunk<
  // GetAllWishlistResponse,
  Customer,
  { token: string; customerId: number },
  { rejectValue: ErrorResponse }
>('customer/getCustomerInfo', async ({ token, customerId }, thunkApi) => {
  // note: _ indicates an absence of parameter without warning
  try {
    const req = await axios.get(`/api/customer/info/${customerId}`, {
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

export const getAllWishlist = createAsyncThunk<
  // GetAllWishlistResponse,
  WishListItem[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getAllWishlist', async (token, thunkApi) => {
  // note: _ indicates an absence of parameter without warning
  try {
    const req = await axios.get('/api/customer/wishlist', {
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

export const getCartItems = createAsyncThunk<
  CartItem[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getCartItems', async (token, thunkApi) => {
  try {
    const req = await axios.get('/api/customer/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = req.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      thunkApi.dispatch(authActions.resetAuth());
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const getCustomerShippings = createAsyncThunk<
  ShippingItem[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getCustomerShippings', async (token, thunkApi) => {
  try {
    const req = await axios.get('/api/customer/shipping', {
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

export const getCustomerNotifications = createAsyncThunk<
  Notification[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getCustomerNotifications', async (token, thunkApi) => {
  try {
    const req = await axios.get('/api/customer/notification', {
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

export const getCustomerOrders = createAsyncThunk<
  Order[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getCustomerOrders', async (token, thunkApi) => {
  try {
    const req = await axios.get('/api/customer/order', {
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

export const getOrderDetail = createAsyncThunk<
  OrderDetail[],
  OrderDetailRequest,
  { rejectValue: ErrorResponse }
>('customer/getOrderDetail', async ({ token, orderId }, thunkApi) => {
  try {
    const req = await axios.get(`/api/customer/order/${orderId}`, {
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

export const addToCart = createAsyncThunk<
  CartItem,
  AddToCartRequest,
  { rejectValue: ErrorResponse }
>('customer/addToCart', async ({ token, productId, quantity }, thunkApi) => {
  try {
    const body = {
      productId,
      quantity,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'Application/json',
    };
    const req = await axios.post('/api/customer/cart/add-item', body, {
      headers,
    });

    const data = req.data;

    thunkApi.dispatch(uiSliceActions.setAlert('Item added to cart'));
    thunkApi.dispatch(getCartItems(token));

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const getCustomerAddress = createAsyncThunk<
  CustomerAddress,
  string,
  { rejectValue: ErrorResponse }
>('customer/getCustomerAddress', async (token, thunkApi) => {
  try {
    const req = await axios.get('/api/customer/address', {
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

export const addNewAddress = createAsyncThunk<
  CustomerAddress,
  NewAddressRequest,
  { rejectValue: ErrorResponse }
>(
  'customer/addAddress',
  async (
    { token, customerId, country, province, state, addressDetail },
    thunkApi
  ) => {
    try {
      const body = {
        customerId,
        country,
        province,
        state,
        addressDetail,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'Application/json',
      };
      const req = await axios.post('api/customer/add-address', body, {
        headers,
      });

      const data = req.data;

      thunkApi.dispatch(uiSliceActions.setAlert('New address added'));

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);

export const addNewWishlist = createAsyncThunk<
  NewWishlistResponse,
  NewWishlistRequest,
  { rejectValue: ErrorResponse }
>('customer/addWishlist', async ({ token, productId }, thunkApi) => {
  try {
    const req = await axios.post(
      `/api/customer/add-wishlist/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = req.data;

    thunkApi.dispatch(uiSliceActions.setAlert('New wishlist added'));
    thunkApi.dispatch(getAllWishlist(token));

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const deleteWishlist = createAsyncThunk<
  void,
  { token: string; wishlistId: number },
  { rejectValue: ErrorResponse }
>('customer/deleteWishlist', async ({ token, wishlistId }, thunkApi) => {
  console.log('initiated');
  try {
    await axios.delete(`/api/customer/wishlist/${wishlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    thunkApi.dispatch(uiSliceActions.setAlert('Wishlist Deleted'));
    thunkApi.dispatch(getAllWishlist(token));
    console.log('evaluated');
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const addNewOrder = createAsyncThunk<
  NewOrderResponse,
  AddOrderRequest,
  { rejectValue: ErrorResponse }
>('customer/addOrder', async ({ token, cartId, paymentMethod }, thunkApi) => {
  try {
    const body = {
      cartId,
      paymentMethod,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const req = await axios.post('/api/customer/order', body, {
      headers,
    });

    const data = req.data;

    thunkApi.dispatch(uiSliceActions.setAlert('New order added'));
    thunkApi.dispatch(getCartItems(token));

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const updateSelectedAddress = createAsyncThunk<
  SelectAddressResponse,
  SelectAddressRequest,
  { rejectValue: ErrorResponse }
>('customer/selectAddress', async ({ token, addressId }, thunkApi) => {
  try {
    const body = {
      addressId,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const req = await axios.put('/api/customer/select-address', body, {
      headers,
    });

    const data = req.data;

    thunkApi.dispatch(uiSliceActions.setAlert('Address updated'));

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});

export const updateCustomer = createAsyncThunk<
  Customer,
  UpdateCustomerRequest,
  { rejectValue: ErrorResponse }
>(
  'customer/updateCustomer',
  async ({ token, customerId, name, email, phone }, thunkApi) => {
    try {
      const body = {
        customerId,
        name,
        phone,
        email,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const req = await axios.put('/api/customer/update', body, {
        headers,
      });

      const data = req.data;

      thunkApi.dispatch(uiSliceActions.setAlert('Update success'));

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  }
);

export const deleteCartItem = createAsyncThunk<
  { affectedRows: number },
  DeleteCartItemRequest,
  { rejectValue: ErrorResponse }
>('customer/deleteCartItem', async ({ token, cartItemId }, thunkApi) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const req = await axios.delete(`/api/customer/cart/remove/${cartItemId}`, {
      headers,
    });

    const data = req.data;

    thunkApi.dispatch(uiSliceActions.setAlert('Item deleted'));
    thunkApi.dispatch(getCartItems(token));

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkApi.dispatch(uiSliceActions.setError(error.response?.data));
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
});
