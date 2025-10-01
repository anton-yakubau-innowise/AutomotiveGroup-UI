import { useState } from "react";
import { storage } from "../utils/localStorage";

export interface VehicleInquiry {
  id: string;
  vehicleId: string;
  vehicleBrand: string;
  vehicleModel: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  timestamp: string;
  status: "new" | "contacted" | "closed";
}

export function useInquiries() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const INQUIRIES_KEY = "car_inquiries";

  const submitInquiry = async (
    inquiry: Omit<VehicleInquiry, "id" | "timestamp" | "status">
  ) => {
    setIsSubmitting(true);
    try {
      const inquiryData: VehicleInquiry = {
        ...inquiry,
        id:
          crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 15),
        timestamp: new Date().toISOString(),
        status: "new",
      };

      // Save to localStorage
      const existingInquiries = getStoredInquiries();
      const updatedInquiries = [inquiryData, ...existingInquiries];

      storage.set(INQUIRIES_KEY, updatedInquiries);

      console.log("Inquiry submitted:", inquiryData);
      return { success: true, inquiryId: inquiryData.id };
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStoredInquiries = (): VehicleInquiry[] => {
    const stored = storage.get<VehicleInquiry[]>(INQUIRIES_KEY);
    return stored && Array.isArray(stored) ? stored : [];
  };

  const getInquiries = (): VehicleInquiry[] => {
    return getStoredInquiries();
  };

  return {
    submitInquiry,
    getInquiries,
    isSubmitting,
  };
}
