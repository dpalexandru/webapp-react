import { createContext, useContext, useState } from "react";

// creo il contesto con valori di default
const LoaderContext = createContext();

// hook personalizzato per accedere facilmente al contesto
export const useLoader = () => useContext(LoaderContext);

// provider che gestisce lo stato del loader
export function LoaderProvider({ children }) {
  // stato: true se sto caricando, false altrimenti
  const [isLoading, setIsLoading] = useState(false);

  // funzioni semplici per attivare/disattivare
  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}
