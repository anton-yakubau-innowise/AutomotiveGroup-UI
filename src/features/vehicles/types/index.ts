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
  year: number;
  mileage: number;
  color: string;
  engineVolume: number;
  power: number;
  description: string;

  bodyType: BodyType;
  engineType: EngineType;
  transmissionType: TransmissionType;

  basePriceAmount: number;
  basePriceCurrency: string;

  status: VehicleStatus;

  imageUrl: string;

  features: string[];
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
