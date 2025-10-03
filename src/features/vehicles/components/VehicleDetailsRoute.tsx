import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VehicleDetails } from "./VehicleDetails";
import { getVehicleById } from "../api";
import { Vehicle } from "../types";
import { useFavorites } from "@/hooks/useFavorites";

export function VehicleDetailsRoute() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (id) {
      getVehicleById(id)
        .then((data) => setVehicle(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!vehicle) return <div className="p-8">Vehicle not found</div>;

  return (
    <VehicleDetails
      vehicle={vehicle}
      onToggleFavorite={toggleFavorite}
      isFavorite={isFavorite(vehicle.id)}
    />
  );
}
