import { useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const FAVORITES_KEY = 'user_favorites';

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      console.log('Загрузка избранного из localStorage...');
      const savedFavorites = storage.get<string[]>(FAVORITES_KEY);
      if (savedFavorites && Array.isArray(savedFavorites)) {
        setFavorites(new Set(savedFavorites));
        console.log('Избранное загружено:', savedFavorites);
      }
    } catch (error) {
      console.error('Ошибка загрузки избранного:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = (newFavorites: Set<string>) => {
    const favoritesArray = Array.from(newFavorites);
    storage.set(FAVORITES_KEY, favoritesArray);
    console.log('Избранное сохранено:', favoritesArray);
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
    isFavorite
  };
}