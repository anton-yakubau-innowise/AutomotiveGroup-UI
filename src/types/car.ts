export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual' | 'CVT';
  bodyType: 'Sedan' | 'Hatchback' | 'Wagon' | 'Crossover' | 'SUV' | 'Coupe' | 'Convertible';
  color: string;
  engineVolume: number;
  power: number;
  images: string[];
  features: string[];
  description: string;
  showroomId: string;
  showroomName: string;
  isNew: boolean;
  isReserved?: boolean;
}

export interface CarFilters {
  brand?: string;
  priceFrom?: number;
  priceTo?: number;
  yearFrom?: number;
  yearTo?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  mileageFrom?: number;
  mileageTo?: number;
}