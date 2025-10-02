import { useState, useEffect, useMemo } from "react";
import {
  Vehicle,
  VehicleFilters as VehicleFiltersType,
} from "@/features/vehicles/types";
import { VehicleCard } from "./VehicleCard";
import { VehicleFilters } from "./VehicleFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Grid3X3, List, SortAsc, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFavorites } from "@/hooks/useFavorites";
import { getVehicles } from "@/features/vehicles/api";
import { VehicleCardSkeleton } from "./VehicleCardSkeleton";

interface VehicleCatalogProps {
  onViewDetails: (vehicle: Vehicle) => void;
}

export function VehicleCatalog({ onViewDetails }: VehicleCatalogProps) {
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<VehicleFiltersType>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "price_asc" | "price_desc" | "year_desc" | "mileage_asc"
  >("price_asc");
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getVehicles();
        setAllVehicles(data);
      } catch (err) {
        setError("Failed to load vehicles. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredAndSortedVehicles = useMemo(() => {
    let result = allVehicles.filter((vehicle) => {
      // Filtering and searching
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText =
          `${vehicle.manufacturer} ${vehicle.model} ${vehicle.color} ${vehicle.bodyType}`.toLowerCase();
        if (!searchableText.includes(query)) return false;
      }

      if (filters.manufacturer && vehicle.manufacturer !== filters.manufacturer)
        return false;
      if (filters.priceFrom && vehicle.basePriceAmount < filters.priceFrom)
        return false;
      if (filters.priceTo && vehicle.basePriceAmount > filters.priceTo)
        return false;
      if (filters.yearFrom && vehicle.year < filters.yearFrom) return false;
      if (filters.yearTo && vehicle.year > filters.yearTo) return false;
      if (filters.engineType && vehicle.engineType !== filters.engineType)
        return false;
      if (
        filters.transmissionType &&
        vehicle.transmissionType !== filters.transmissionType
      )
        return false;
      if (filters.bodyType && vehicle.bodyType !== filters.bodyType)
        return false;
      if (filters.mileageFrom && vehicle.mileage < filters.mileageFrom)
        return false;
      if (filters.mileageTo && vehicle.mileage > filters.mileageTo)
        return false;

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.basePriceAmount - b.basePriceAmount;
        case "price_desc":
          return b.basePriceAmount - a.basePriceAmount;
        case "year_desc":
          return b.year - a.year;
        case "mileage_asc":
          return a.mileage - b.mileage;
        default:
          return 0;
      }
    });

    return result;
  }, [allVehicles, filters, searchQuery, sortBy]);

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const activeFiltersCount =
    Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  // Function to render content based on state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <VehicleCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-red-200">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      );
    }

    if (filteredAndSortedVehicles.length > 0) {
      return (
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredAndSortedVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={onViewDetails}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite(vehicle.id)}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="text-gray-400 mb-4">
          <Search className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No cars found
        </h3>
        <p className="text-gray-600 mb-4">
          Try changing your search criteria or filters
        </p>
        <Button onClick={clearFilters} variant="outline">
          Clear Filters
        </Button>
      </div>
    );
  };

  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Catalog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your dream car from our extensive catalog
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <VehicleFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              {/* ... Search Bar and Controls ... */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by manufacturer, model, color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Found:</span>
                    <Badge variant="secondary">
                      {filteredAndSortedVehicles.length} vehicles
                    </Badge>
                  </div>
                  {activeFiltersCount > 0 && (
                    <Badge variant="outline">
                      Filters: {activeFiltersCount}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Select
                    value={sortBy}
                    onValueChange={(value: any) => setSortBy(value)}
                  >
                    <SelectTrigger className="w-40">
                      <SortAsc className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price_asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price_desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="year_desc">
                        Year: Newest First
                      </SelectItem>
                      <SelectItem value="mileage_asc">
                        Mileage: Lowest First
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
}
