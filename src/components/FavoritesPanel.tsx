import { useState, useMemo } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { Car } from "../types/car";
import { CarCard } from "./CarCard";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Heart, X } from "lucide-react";

interface FavoritesPanelProps {
  cars: Car[];
  onViewDetails: (car: Car) => void;
}

export function FavoritesPanel({ cars, onViewDetails }: FavoritesPanelProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);

  const favoriteCars = useMemo(() => {
    return cars.filter(car => isFavorite(car.id));
  }, [cars, favorites]);

  const handleViewDetails = (car: Car) => {
    setIsOpen(false);
    onViewDetails(car);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 left-4 z-50">
          <Heart className="h-4 w-4 mr-2" />
          Favorites ({favoriteCars.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Favorite Cars</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="mt-6">
          {favoriteCars.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No favorite cars yet</p>
              <p className="text-sm mt-2">
                Click the heart icon on a car card to add it to favorites
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {favoriteCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
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