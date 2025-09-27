import { useState, useMemo } from "react";
import { Car, CarFilters as CarFiltersType } from "../types/car";
import { CarCard } from "./CarCard";
import { CarFilters } from "./CarFilters";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, Grid3X3, List, SortAsc } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useFavorites } from "../hooks/useFavorites";

interface CarCatalogProps {
  cars: Car[];
  onViewDetails: (car: Car) => void;
}

export function CarCatalog({ cars, onViewDetails }: CarCatalogProps) {
  const [filters, setFilters] = useState<CarFiltersType>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"price_asc" | "price_desc" | "year_desc" | "mileage_asc">("price_asc");
  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredAndSortedCars = useMemo(() => {
    let result = cars.filter((car) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = `${car.brand} ${car.model} ${car.color} ${car.bodyType}`.toLowerCase();
        if (!searchableText.includes(query)) return false;
      }

      // Filters
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.priceFrom && car.price < filters.priceFrom) return false;
      if (filters.priceTo && car.price > filters.priceTo) return false;
      if (filters.yearFrom && car.year < filters.yearFrom) return false;
      if (filters.yearTo && car.year > filters.yearTo) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
      if (filters.mileageFrom && car.mileage < filters.mileageFrom) return false;
      if (filters.mileageTo && car.mileage > filters.mileageTo) return false;

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "year_desc":
          return b.year - a.year;
        case "mileage_asc":
          return a.mileage - b.mileage;
        default:
          return 0;
      }
    });

    return result;
  }, [cars, filters, searchQuery, sortBy]);

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };



  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Car Catalog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your dream car from our extensive catalog
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <CarFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Controls */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by brand, model, color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Found:</span>
                    <Badge variant="secondary">
                      {filteredAndSortedCars.length} cars
                    </Badge>
                  </div>
                  {activeFiltersCount > 0 && (
                    <Badge variant="outline">
                      Filters: {activeFiltersCount}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-40">
                      <SortAsc className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price_asc">Price: Low to High</SelectItem>
                      <SelectItem value="price_desc">Price: High to Low</SelectItem>
                      <SelectItem value="year_desc">Year: Newest First</SelectItem>
                      <SelectItem value="mileage_asc">Mileage: Lowest First</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
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

            {/* Cars Grid */}
            {filteredAndSortedCars.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredAndSortedCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onViewDetails={onViewDetails}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={isFavorite(car.id)}
                  />
                ))}
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}