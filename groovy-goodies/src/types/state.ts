import { Customer, Order, OrderItem } from './databaseSchema';
import { CartItem, OrderDetail, ShippingItem, WishListItem } from './response';

export interface AuthState {
  token: string | undefined;
  isAuthenticated: boolean;
  userId: number | undefined;
  loading: boolean;
}

export interface CustomerState extends Customer {
  orders: Order[];
  orderDetail: OrderDetail | undefined;
  wishlists: WishListItem[];
  cartItems: CartItem[];
  shipping: ShippingItem[];
  notifications: Notification[];
  loading: boolean;
}
