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
