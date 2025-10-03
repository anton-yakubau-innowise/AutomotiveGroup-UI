export interface Showroom {
  id: string;
  alias: string | null;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  operatingHours: string;
  status: "Open" | "Closed" | "UnderRenovation";
  createdAt: string;
  updatedAt: string | null;
}

export interface ShowroomSummary {
  id: string;
  name: string;
}
