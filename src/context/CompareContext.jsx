import { createContext, useContext, useState } from "react";

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [selected, setSelected] = useState([]);

  const addToCompare = (product) => {
    setSelected((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length === 2) return [prev[1], product];
      return [...prev, product];
    });
  };

  const clearCompare = () => setSelected([]);

  return (
    <CompareContext.Provider value={{ selected, addToCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}
