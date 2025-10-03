import apiClient from "@/api/apiClient";
import { Showroom } from "../types";

export const getShowrooms = async (): Promise<Showroom[]> => {
  const response = await apiClient.get<Showroom[]>("/showrooms");
  return response.data;
};

export const getShowroomById = async (id: string): Promise<Showroom> => {
  const response = await apiClient.get<Showroom>(`/showrooms/${id}`);
  return response.data;
};
