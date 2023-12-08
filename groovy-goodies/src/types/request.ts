export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterCustomerRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface RegisterClerkRequest {
  name: string;
  email: string;
  password: string;
}

export interface NewAddressRequest {
  token: string;
  customerId: number;
  country: string;
  province: string;
  state: string;
  addressDetail: string;
}

export interface NewWishlistRequest {
  token: string;
  productId: string;
}

export interface AddToCartRequest {
  token: string;
  productId: number;
  quantity: number;
}

export interface AddOrderRequest {
  token: string;
  paymentMethod: string;
  cartId: number;
}

export interface OrderDetailRequest {
  token: string;
  orderId: number;
}

export interface UpdateCustomerRequest {
  token: string;
  customerId: number;
  name: string;
  phone: string;
  email: string;
}

export interface DeleteCartItemRequest {
  token: string;
  cartItemId: number;
}

export interface SelectAddressRequest {
  token: string;
  addressId: number;
}

export interface ConfirmOrderRequest {
  token: string;
  orderId: number;
}

export interface SendNotificationRequest {
  token: string;
  customerId: number;
  message: string;
}

export interface AddNewProductRequest {
  token: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productCategory: string;
}

export interface EditProductRequest {
  token: string;
  productId: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productCategory: string;
}

export interface DeleteProductRequest {
  token: string;
  productId: string;
}
