import { useEffect, useState } from "react";

import { COLLECTION_IDS } from "@/lib/constants";
import { ICollection } from "@/lib/typesAPI";

const useMovieCollections = () => {
  // Setting the states for collections, error and loading state
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Use effect that fetches data for movie collections
  useEffect(() => {
    // Controller for future return function
    const controller = new AbortController();
    const { signal } = controller;

    // Fetch function
    const fetchCollections = async () => {
      try {
        // Enable loading state
        setIsLoading(true);

        // Fetch all pre-determined IDs
        const responses = await Promise.all(
          COLLECTION_IDS.map((id) =>
            fetch(`/.netlify/functions/tmdb-collection?id=${id}`, {
              signal,
            }).then((res) =>
              res.ok
                ? res.json()
                : Promise.reject(`Failed to fetch collection ${id}`),
            ),
          ),
        );
        // Update the state
        setCollections(responses);
      } catch (err: unknown) {
        // Ignore the abort controller error
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        // Set the error message
        setError("Couldn't fetch movie collections data");
      } finally {
        // Disable loading state
        setIsLoading(false);
      }
    };

    // Call fetch function
    fetchCollections();

    // Cleanup function
    return () => controller.abort();
  }, []);

  // Return all the data
  return { collections, isLoading, error };
};

export default useMovieCollections;
