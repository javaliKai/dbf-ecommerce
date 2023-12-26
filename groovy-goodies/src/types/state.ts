import {
  Clerk,
  Customer,
  CustomerAddress,
  Notification,
  Order,
  Product,
} from './databaseSchema';
import {
  CartItem,
  ErrorResponse,
  OrderDetail,
  ShippingItem,
  WishListItem,
} from './response';

export interface AuthState {
  token: string | undefined;
  isAuthenticated: boolean;
  userId: number | undefined;
  loading: boolean;
}

export interface CustomerState extends Customer {
  orders: Order[];
  orderDetail: OrderDetail[] | undefined;
  wishlists: WishListItem[];
  cartItems: CartItem[];
  shipping: ShippingItem[];
  notifications: Notification[];
  address: CustomerAddress;
  cartId: number | undefined;
  loading: boolean;
}

export interface ClerkState extends Clerk {
  orders: Order[];
  notifications: Notification[];
  customers: Customer[];
  loading: boolean;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
}

export interface UIState {
  error: ErrorResponse | undefined;
  alert: string | undefined;
  showCartSidebar: boolean;
  showWishlistSidebar: boolean;
  showAddressModal: boolean;
}
