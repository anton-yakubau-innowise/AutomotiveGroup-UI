import apiClient from "@/api/apiClient";
import { CreateInquiryPayload, Inquiry } from "../types";

export const createInquiry = async (
  payload: CreateInquiryPayload
): Promise<Inquiry> => {
  try {
    const response = await apiClient.post<Inquiry>("/orders/", payload);
    return response.data;
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    throw error;
  }
};
