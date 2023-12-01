export interface Customer {
  customerId: number | undefined;
  customerName: string | undefined;
  customerPhone: string | undefined;
  customerEmail: string | undefined;
}

export interface Clerk {
  clerkId: number;
  clerkName: string;
  clerkEmail: string;
}

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productCategory: string;
}
