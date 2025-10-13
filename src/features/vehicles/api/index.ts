import apiClient from "@/api/apiClient";
import { Vehicle } from "@/features/vehicles/types";

export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await apiClient.get<Vehicle[]>("/vehicles/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    throw error;
  }
};

export const getVehicleById = async (id: string): Promise<Vehicle> => {
  try {
    const response = await apiClient.get<Vehicle>(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch vehicle:", error);
    throw error;
  }
};

// export const createVehicle = async (data: CreateVehicleRequest): Promise<Vehicle> => { };
