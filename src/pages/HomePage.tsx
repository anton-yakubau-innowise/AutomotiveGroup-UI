import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { VehicleCatalog } from "@/features/vehicles/components/VehicleCatalog";
import { FavoritesPanel } from "@/components/FavoritesPanel";
import { InquiriesPanel } from "@/components/InquiriesPanel";
import { useNavigate } from "react-router-dom";
import { Vehicle } from "@/features/vehicles/types";
import { getVehicles } from "@/features/vehicles/api";

export function HomePage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Failed to load vehicle data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleViewDetails = (vehicle: Vehicle) => {
    navigate(`/vehicles/${vehicle.id}`);
  };

  return (
    <>
      <Hero />
      <VehicleCatalog vehicles={vehicles} isLoading={isLoading} error={error} />
      <FavoritesPanel vehicles={vehicles} onViewDetails={handleViewDetails} />
      <InquiriesPanel />
    </>
  );
}
