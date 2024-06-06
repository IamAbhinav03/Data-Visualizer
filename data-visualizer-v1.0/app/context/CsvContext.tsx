// app/context/CsvContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface DataPoint {
  x: number;
  y: number;
}

interface CsvContextType {
  data: DataPoint[];
  setData: (data: DataPoint[]) => void;
}

const CsvContext = createContext<CsvContextType | undefined>(undefined);

export const CsvProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataPoint[]>([]);

  return (
    <CsvContext.Provider value={{ data, setData }}>
      {children}
    </CsvContext.Provider>
  );
};

export const useCsv = () => {
  const context = useContext(CsvContext);
  if (context === undefined) {
    throw new Error("useCsv must be used within a CsvProvider");
  }
  return context;
};
