import { ISearchResults } from "@/lib/typesAPI";

// API for getting search results
export async function getSearchResults(
  query: string,
  page: number = 1,
  signal?: AbortSignal,
): Promise<ISearchResults> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-search?query=${encodeURIComponent(query)}&page=${page}`,
      { signal },
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the search results data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Return the show
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching search results data");
  }
}
