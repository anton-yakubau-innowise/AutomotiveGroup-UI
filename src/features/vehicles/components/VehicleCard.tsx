import { Vehicle } from "@/features/vehicles/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Calendar, Fuel, Gauge, Settings, MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  vehicle: Vehicle;
  onToggleFavorite?: (vehicleId: string) => void;
  isFavorite?: boolean;
}

export function VehicleCard({
  vehicle,
  onToggleFavorite,
  isFavorite,
}: VehicleCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/vehicles/${vehicle.id}`);
  };

  const primaryPhoto =
    vehicle.photos?.find((p) => p.isPrimary) || vehicle.photos?.[0];

  const formatPrice = (price: number) => {
    return "$" + new Intl.NumberFormat("en-US").format(price);
  };

  const formatMileage = (mileage: number) => {
    if (mileage === 0) return "New";
    return new Intl.NumberFormat("en-US").format(mileage) + " km";
  };

  const getStatusBadge = () => {
    switch (vehicle.status) {
      case "Available":
        if (vehicle.mileage === 0) {
          return (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              New
            </Badge>
          );
        }
        return null;
      case "Reserved":
        return <Badge variant="secondary">Reserved</Badge>;
      case "Sold":
        return <Badge variant="destructive">Sold</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={primaryPhoto?.photoUrl}
            alt={`${vehicle.manufacturer} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {getStatusBadge()}
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title and Price */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {vehicle.manufacturer} {vehicle.model}{" "}
          </h3>
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(vehicle.basePriceAmount)}{" "}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            <span>{vehicle.engineType}</span>{" "}
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>{vehicle.transmissionType}</span>{" "}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleViewDetails}
          className="w-full"
          variant="outline"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
