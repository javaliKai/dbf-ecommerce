import {
  Cart,
  Order,
  OrderItem,
  Product,
  Shipping,
  Wishlist,
} from './databaseSchema';

export interface ErrorResponse {
  message: string;
  data: undefined | [];
}

export interface CustomerAuthResponse {
  token: string;
  cust_id: number;
}

export interface ClerkAuthResponse {
  token: string;
  clerk_id: number;
}

export interface RegisterCustomerResponse {
  cust_id: number;
  cust_name: string;
  cust_phone: string;
  cust_email: string;
  cust_password: string;
}

export interface RegisterClerkResponse {
  clerk_id: number;
  clerk_name: string;
  clerk_email: string;
  clerk_password: string;
}

export interface WishListItem extends Wishlist, Product {}

export interface CartItem extends Cart, Product {}

export interface ShippingItem extends Shipping {
  customer_id: number;
  order_status: string;
  payment_method: string;
}

export interface OrderDetail extends Order, OrderItem, Product {}

export interface NewWishlistResponse {
  wishlist_id: number;
  product_id: string;
  customer_id: number;
}

export interface NewOrderResponse {
  order_id: number;
  customer_id: number;
  order_status: string;
  payment_method: string;
  selected_address: number;
}

export interface SelectAddressResponse {
  address_id: number;
  customer_id: number;
  is_selected: number;
}

export interface ConfirmOrderResponse {
  shipping_id: number;
  order_id: number;
  clerk_id: number;
  shipping_status: string;
  shipping_address: number;
}

export interface SendNotificationResponse {
  notificationId: number;
  customerId: number;
  clerkId: number;
  message: string;
  isRead: number;
}
