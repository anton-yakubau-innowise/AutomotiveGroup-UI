export interface User {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
