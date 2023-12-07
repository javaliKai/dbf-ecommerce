export interface Customer {
  cust_id: number | undefined;
  cust_name: string | undefined;
  cust_phone: string | undefined;
  cust_email: string | undefined;
}

export interface Clerk {
  clerk_id: number;
  clerk_name: string;
  clerk_email: string;
}

export interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_image: string;
  product_price: number;
  product_category: string;
}

export interface Wishlist {
  wishlist_id: number;
  product_id: string;
  customer_id: number;
  date_issued: Date;
}

export interface Cart {
  cart_id: number;
  customer_id: number;
  date_issued: Date;
}

export interface Shipping {
  shipping_id: number;
  order_id: number;
  clerk_id: number;
  date_issued: Date;
  shipping_status: string;
  shipping_address: number;
}

export interface Order {
  order_id: number;
  customer_id: number;
  date_issued: Date;
  order_status: string;
  payment_method: string;
  date_finished: Date | null;
  selected_address: number;
}

export interface OrderItem {
  orderitem_id: number;
  order_id: number;
  product_id: string;
  quantity: number;
}

export interface Notification {
  notification_id: number;
  customer_id: number;
  clerk_id: number;
  message: string;
  is_read: number;
  created_at: Date;
}

export interface CustomerAddress {
  address_id: number;
  cust_id: number;
  country: string;
  province: string;
  state: string;
  address_detail: string;
  is_selected: number;
}
