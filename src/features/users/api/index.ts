import apiClient from "@/api/apiClient";
import { User } from "../types";

export interface LoginCredentials {
  loginIdentifier: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await apiClient.post<{ token: string; user: User }>(
    "/auth/login",
    credentials
  );
  return response.data;
};

export const registerUser = async (registerData: RegisterData) => {
  const response = await apiClient.post<{ token: string; user: User }>(
    "/auth/register",
    registerData
  );
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await apiClient.get<User>(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<User>
) => {
  const response = await apiClient.put<User>(`/users/${userId}`, updates);
  return response.data;
};
