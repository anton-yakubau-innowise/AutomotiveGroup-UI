import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VehicleCatalog } from "./features/vehicles/components/VehicleCatalog";
import { VehicleDetails } from "./features/vehicles/components/VehicleDetails";
import { InquiriesPanel } from "./components/InquiriesPanel";
import { FavoritesPanel } from "./components/FavoritesPanel";
import { UserDashboard } from "./components/UserDashboard";
import { mockCars } from "./data/mockCars";
import { Vehicle } from "./features/vehicles/types";
import { useFavorites } from "./hooks/useFavorites";
import { Toaster } from "./components/ui/sonner";

type AppView = "catalog" | "vehicle-details" | "dashboard";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("catalog");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentView("vehicle-details");
  };

  const handleBackToCatalog = () => {
    setSelectedVehicle(null);
    setCurrentView("catalog");
  };

  const handleShowDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleBackToCatalogFromDashboard = () => {
    setCurrentView("catalog");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "vehicle-details":
        return selectedVehicle ? (
          <VehicleDetails
            vehicle={selectedVehicle}
            onBack={handleBackToCatalog}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(selectedVehicle.id)}
          />
        ) : null;

      case "dashboard":
        return (
          <UserDashboard
            onBack={handleBackToCatalogFromDashboard}
            onViewCarDetails={handleViewDetails}
          />
        );

      case "catalog":
      default:
        return (
          <>
            <Hero />
            <VehicleCatalog onViewDetails={handleViewDetails} />
            <FavoritesPanel
              vehicles={mockCars}
              onViewDetails={handleViewDetails}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onShowDashboard={handleShowDashboard} />
      {renderCurrentView()}
      {currentView === "catalog" && <InquiriesPanel />}
      <Toaster />
    </div>
  );
}
