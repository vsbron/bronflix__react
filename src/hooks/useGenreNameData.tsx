import { useState, useEffect } from "react";
import { getGenres } from "@/services/apiGenres";

export function useGenreNameData(type: "tv" | "movie", genreId: string) {
  // Setting the state for genre name, error and loading state
  const [genreName, setGenreName] = useState<string>("Unknown");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Setting the controller for cleanup function
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchGenres = async () => {
      // Enable loading state
      setIsLoading(true);

      try {
        // Get the full genres list, find the one we're interested in
        const data = await getGenres(type, signal);
        const genre = data.find(
          (g: { id: number; name: string }) => g.id === parseInt(genreId),
        );

        // If there's a genre name, update the state
        genre && setGenreName(genre.name);
        // Disable loading state
        setIsLoading(false);
      } catch (err) {
        // Ignore the abort controller error
        if (err instanceof DOMException && err.name === "AbortError") {
          return; // Ignore
        }
        // Set the error message
        setError(`Failed to fetch ${type} genre data`);
        // Disable loading state
        setIsLoading(false);
      }
    };

    // Call the function
    fetchGenres();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [genreId, type]);

  return { genreName, error, isLoading };
}
