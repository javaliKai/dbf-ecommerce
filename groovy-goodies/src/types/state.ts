import { Clerk, Customer } from './databaseSchema';

export interface AuthState {
  token: string | undefined;
  isAuthenticated: boolean;
  userId: number | undefined;
  loading: boolean;
}
