import { createContext, useContext, useState, useEffect } from "react";

import { getGenres } from "@/services/apiGenres";

import { GenresContextType, GenresProviderProps } from "@/lib/types";
import { IGenre } from "@/lib/typesAPI";

// Creating the context
const GenresContext = createContext<GenresContextType | undefined>(undefined);

// The provider component that fetches the genres from API
export function GenresProvider({ children }: GenresProviderProps) {
  const [genres, setGenres] = useState<IGenre[]>([]);

  // Use effect that fetches data on mount
  useEffect(() => {
    // Creating controller for cleanup function
    const controller = new AbortController();
    const { signal } = controller;

    // Fetching data
    async function fetchGenres() {
      try {
        const data = await getGenres("movie", signal);
        setGenres(data);
      } catch (error) {
        // Ignore the abort controller error
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error("Error fetching genres:", error);
      }
    }

    // Call the function
    fetchGenres();

    // Cleanup function
    return () => {
      controller.abort(); // Abort fetch on unmount
    };
  }, []);

  // Returned provider with fetched genres
  return (
    <GenresContext.Provider value={{ genres }}>
      {children}
    </GenresContext.Provider>
  );
}

// Custom hook for easier use
export function useGenres() {
  // Getting the context with special hook
  const context = useContext(GenresContext);

  // Guard clause
  if (!context) {
    throw new Error("useGenres must be used within a GenresProvider");
  }

  // Return context
  return context;
}
