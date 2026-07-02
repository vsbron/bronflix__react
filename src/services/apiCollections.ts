import { ICollection } from "@/lib/typesAPI";

// API for getting movie collection
export async function getMovieCollection(
  collectionId: string,
  signal?: AbortSignal,
): Promise<ICollection> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-collection?id=${collectionId}`,
      { signal },
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the collection data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Return the collection
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching collection data");
  }
}
