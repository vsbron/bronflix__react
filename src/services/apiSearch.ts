import { MEDIA_URL } from "@/lib/constants";
import { ISearchResults } from "@/lib/typesAPI";

// API for getting search results
export async function getSearchResults(
  query: string,
  page: number,
): Promise<ISearchResults> {
  try {
    // Fetching the data
    const response = await fetch(
      `${MEDIA_URL}search/multi?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&query=${encodeURIComponent(query)}&page=${page}`,
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
