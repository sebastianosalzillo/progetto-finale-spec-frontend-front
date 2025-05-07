import { createContext, useContext, useEffect, useState } from "react";

export type Favorite = {
  id: number;
  title: string;
};

export type FavoritesContextType<T> = {
  favorites: T[];
  toggleFavorite: (item: T) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType<Favorite> | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item: Favorite) => {
    setFavorites((prev) =>
      prev.some(fav => fav.id === item.id)
        ? prev.filter(fav => fav.id !== item.id)
        : [...prev, item]
    );
  };

  const isFavorite = (id: number) =>
    favorites.some(item => item.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}
