import { VehicleStatus } from "@/features/vehicles/types";

export interface CreateInquiryPayload {
  customerId: string;
  vehicleId: string;
}

export interface Inquiry {
  id: string;
  customerId: string;
  vehicleId: string;
  totalPrice: {
    amount: number;
    currency: string;
  };
  status: VehicleStatus;
  createdAt: string;
  updatedAt?: string;
}
