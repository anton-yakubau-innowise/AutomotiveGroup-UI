import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VehicleFilters as VehicleFiltersType } from "@/features/vehicles/types";
import { SlidersHorizontal, X } from "lucide-react";

interface VehicleFiltersProps {
  filters: VehicleFiltersType;
  onFiltersChange: (filters: VehicleFiltersType) => void;
  onClearFilters: () => void;
}

export function VehicleFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: VehicleFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const brands = [
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Toyota",
    "Volkswagen",
    "Lexus",
    "Volvo",
  ];
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"];
  const transmissions = ["Automatic", "Manual", "CVT"];
  const bodyTypes = [
    "Sedan",
    "Hatchback",
    "Wagon",
    "Crossover",
    "SUV",
    "Coupe",
    "Convertible",
  ];

  const updateFilter = (
    key: keyof VehicleFiltersType,
    value: string | number | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value === "" ? undefined : value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined
  );

  return (
    <div className="space-y-4">
      {/* Toggle Button for Mobile */}
      <div className="flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Search Filters</CardTitle>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="hidden lg:flex"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Brand</Label>
              <Select
                value={filters.manufacturer || ""}
                onValueChange={(value: string) =>
                  updateFilter("manufacturer", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price from ($)</Label>
                <Input
                  type="number"
                  placeholder="From"
                  value={filters.priceFrom || ""}
                  onChange={(e) =>
                    updateFilter(
                      "priceFrom",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
              <div>
                <Label>Price to ($)</Label>
                <Input
                  type="number"
                  placeholder="To"
                  value={filters.priceTo || ""}
                  onChange={(e) =>
                    updateFilter(
                      "priceTo",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Year from</Label>
                <Input
                  type="number"
                  placeholder="2015"
                  value={filters.yearFrom || ""}
                  onChange={(e) =>
                    updateFilter(
                      "yearFrom",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
              <div>
                <Label>Year to</Label>
                <Input
                  type="number"
                  placeholder="2024"
                  value={filters.yearTo || ""}
                  onChange={(e) =>
                    updateFilter(
                      "yearTo",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </div>

            <div>
              <Label>Fuel Type</Label>
              <Select
                value={filters.engineType || ""}
                onValueChange={(value: string) =>
                  updateFilter("engineType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Transmission</Label>
              <Select
                value={filters.transmissionType || ""}
                onValueChange={(value: string) =>
                  updateFilter("transmissionType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  {transmissions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Body Type</Label>
              <Select
                value={filters.bodyType || ""}
                onValueChange={(value: string) =>
                  updateFilter("bodyType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Mileage from (miles)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.mileageFrom || ""}
                  onChange={(e) =>
                    updateFilter(
                      "mileageFrom",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
              <div>
                <Label>Mileage to (miles)</Label>
                <Input
                  type="number"
                  placeholder="100000"
                  value={filters.mileageTo || ""}
                  onChange={(e) =>
                    updateFilter(
                      "mileageTo",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
