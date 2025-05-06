import { createContext, useContext, useEffect, useState } from "react";

type Favorite = {
  id : number,
  title : string
}
type FavoritesContextType = {
  favorites: Favorite [];
  toggleFavorite: (favorite : Favorite) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) return JSON.parse(stored);
    return [];
  });


  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (favorite : Favorite ) => {
    setFavorites((prev) =>
      prev.some(item => item.id === favorite.id) ? prev.filter(item => item.id !== favorite.id) : [...prev , favorite]
    );
  };

  const isFavorite = (id: number) => favorites.some(item => item.id === id);

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

