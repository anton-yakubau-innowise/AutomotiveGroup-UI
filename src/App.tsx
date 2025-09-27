import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CarCatalog } from "./components/CarCatalog";
import { CarDetails } from "./components/CarDetails";
import { InquiriesPanel } from "./components/InquiriesPanel";
import { FavoritesPanel } from "./components/FavoritesPanel";
import { UserDashboard } from "./components/UserDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { mockCars } from "./data/mockCars";
import { Car } from "./types/car";
import { useFavorites } from "./hooks/useFavorites";
import { Toaster } from "./components/ui/sonner";

type AppView = 'catalog' | 'car-details' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('catalog');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setCurrentView('car-details');
  };

  const handleBackToCatalog = () => {
    setSelectedCar(null);
    setCurrentView('catalog');
  };

  const handleShowDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBackToCatalogFromDashboard = () => {
    setCurrentView('catalog');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'car-details':
        return selectedCar ? (
          <CarDetails
            car={selectedCar}
            onBack={handleBackToCatalog}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(selectedCar.id)}
          />
        ) : null;
      
      case 'dashboard':
        return (
          <UserDashboard
            onBack={handleBackToCatalogFromDashboard}
            onViewCarDetails={handleViewDetails}
          />
        );
      
      case 'catalog':
      default:
        return (
          <>
            <Hero />
            <CarCatalog
              cars={mockCars}
              onViewDetails={handleViewDetails}
            />
            <FavoritesPanel
              cars={mockCars}
              onViewDetails={handleViewDetails}
            />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header onShowDashboard={handleShowDashboard} />
        {renderCurrentView()}
        {currentView === 'catalog' && <InquiriesPanel />}
        <Toaster />
      </div>
    </AuthProvider>
  );
}