import { createContext, useContext, useState } from "react";
import {ReactNode} from "react";


type CompareContextType = {
  selected: number[];
  addToCompare: (id: number) => void;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<number[]>([]);

  const addToCompare = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length === 2) return [prev[1], id];
      return [...prev, id];
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
