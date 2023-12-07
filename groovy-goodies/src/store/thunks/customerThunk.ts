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
import { RootState } from '../store';
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

export const getAllWishlist = createAsyncThunk<
  // GetAllWishlistResponse,
  WishListItem[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getAllWishlist', async (token, thunkApi) => {
  // note: _ indicates an absence of parameter without warning
  try {
    const req = await axios.get('api/customer/wishlist', {
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

export const getCartItems = createAsyncThunk<
  CartItem[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getCartItems', async (token, thunkApi) => {
  try {
    const req = await axios.get('api/customer/cart', {
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

export const getCustomerShippings = createAsyncThunk<
  ShippingItem[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getCustomerShippings', async (token, thunkApi) => {
  try {
    const req = await axios.get('api/customer/shipping', {
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

export const getCustomerNotifications = createAsyncThunk<
  Notification[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getCustomerNotifications', async (token, thunkApi) => {
  try {
    const req = await axios.get('api/customer/notification', {
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

export const getCustomerOrders = createAsyncThunk<
  Order[],
  string,
  { rejectValue: ErrorResponse }
>('customer/getCustomerOrders', async (token, thunkApi) => {
  try {
    const req = await axios.get('api/customer/order', {
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

export const getOrderDetail = createAsyncThunk<
  OrderDetail,
  OrderDetailRequest,
  { rejectValue: ErrorResponse }
>('customer/getOrderDetail', async ({ token, orderId }, thunkApi) => {
  try {
    const req = await axios.get(`api/customer/order/${orderId}`, {
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
    const req = await axios.post('api/customer/cart/add-item', body, {
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

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
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
      `api/customer/add-wishlist/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = req.data;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
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
    const req = await axios.post('api/customer/order', body, {
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

/**Todo: finish the thunk definition for functions below */
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
    const req = await axios.put('api/customer/select-address', body, {
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
      const req = await axios.put('api/customer/update', body, {
        headers,
      });

      const data = req.data;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
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
    const req = await axios.delete(`api/customer/cart/remove/${cartItemId}`, {
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
