import { useState, useMemo } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { Vehicle } from "@/features/vehicles/types";
import { VehicleCard } from "@/features/vehicles/components/VehicleCard";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Heart, X } from "lucide-react";

interface FavoritesPanelProps {
  vehicles: Vehicle[];
  onViewDetails: (vehicle: Vehicle) => void;
}

export function FavoritesPanel({
  vehicles,
  onViewDetails,
}: FavoritesPanelProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);

  const favoriteVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => isFavorite(vehicle.id));
  }, [vehicles, favorites]);

  const handleViewDetails = (vehicle: Vehicle) => {
    setIsOpen(false);
    onViewDetails(vehicle);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 left-4 z-50">
          <Heart className="h-4 w-4 mr-2" />
          Favorites ({favoriteVehicles.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Favorite Cars</SheetTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6">
          {favoriteVehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No favorite cars yet</p>
              <p className="text-sm mt-2">
                Click the heart icon on a car card to add it to favorites
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriteVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
