import { Car } from "../types/car";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Fuel, Gauge, Settings, MapPin, Heart } from "lucide-react";

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
  onToggleFavorite?: (carId: string) => void;
  isFavorite?: boolean;
}

export function CarCard({ car, onViewDetails, onToggleFavorite, isFavorite }: CarCardProps) {
  const formatPrice = (price: number) => {
    return '$' + new Intl.NumberFormat('en-US').format(price);
  };

  const formatMileage = (mileage: number) => {
    if (mileage === 0) return 'New';
    return new Intl.NumberFormat('en-US').format(mileage) + ' mi';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              New
            </Badge>
          )}
          {car.isReserved && (
            <Badge variant="secondary">
              Reserved
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(car.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title and Price */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {car.brand} {car.model}
          </h3>
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(car.price)}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
        </div>

        {/* Engine Info */}
        <div className="text-sm text-gray-600">
          {car.engineVolume}L • {car.power} HP • {car.color}
        </div>

        {/* Showroom */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>{car.showroomName}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onViewDetails(car)} 
          className="w-full"
          variant="outline"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}