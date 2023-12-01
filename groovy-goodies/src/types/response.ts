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
