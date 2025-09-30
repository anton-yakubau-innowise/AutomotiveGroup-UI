import { useState, useEffect } from "react";
import { storage } from "../utils/localStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const FAVORITES_KEY = "user_favorites";

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      console.log("Loading Favorites from localStorage...");
      const savedFavorites = storage.get<string[]>(FAVORITES_KEY);
      if (savedFavorites && Array.isArray(savedFavorites)) {
        setFavorites(new Set(savedFavorites));
        console.log("Favorites loaded:", savedFavorites);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = (newFavorites: Set<string>) => {
    const favoritesArray = Array.from(newFavorites);
    storage.set(FAVORITES_KEY, favoritesArray);
    console.log("Favorites saved:", favoritesArray);
  };

  const toggleFavorite = (carId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(carId)) {
      newFavorites.delete(carId);
    } else {
      newFavorites.add(carId);
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (carId: string) => favorites.has(carId);

  return {
    favorites: Array.from(favorites),
    isLoading,
    toggleFavorite,
    isFavorite,
  };
}
