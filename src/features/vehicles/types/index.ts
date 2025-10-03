import { ShowroomSummary } from "@/features/showrooms/types";

export type VehicleStatus = "Available" | "Reserved" | "Sold";
export type EngineType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";
export type TransmissionType = "Automatic" | "Manual" | "CVT";
export type BodyType =
  | "Sedan"
  | "Hatchback"
  | "Wagon"
  | "Crossover"
  | "SUV"
  | "Coupe"
  | "Convertible";

export interface Vehicle {
  id: string;
  vin: string;
  manufacturer: string;
  model: string;
  package: string;
  year: number;
  mileage: number;
  color: string;
  engineVolume: number;
  power: number;
  description: string;
  showroom: ShowroomSummary;

  bodyType: BodyType;
  engineType: EngineType;
  transmissionType: TransmissionType;

  basePriceAmount: number;
  basePriceCurrency: string;

  status: VehicleStatus;

  photos: VehiclePhoto[];

  features: string[];
}

export interface VehiclePhoto {
  id: string;
  photoUrl: string;
  description?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface VehicleFilters {
  manufacturer?: string;
  priceFrom?: number;
  priceTo?: number;
  yearFrom?: number;
  yearTo?: number;
  engineType?: EngineType;
  transmissionType?: TransmissionType;
  bodyType?: BodyType;
  mileageFrom?: number;
  mileageTo?: number;
}
