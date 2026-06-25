import { MEDIA_URL } from "@/lib/constants";
import { APIFetchType, ISeason, IShow, IShowList } from "@/lib/typesAPI";

// API for getting the shows
export async function getShows(type: APIFetchType): Promise<IShowList[]> {
  try {
    // Fetch the data
    const response = await fetch(
      `${MEDIA_URL}tv/${type}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&page=1&include_adult=false`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(`Failed to fetch the shows data: ${response.statusText}`);
    }

    // Getting the actual data
    const data = await response.json();

    // Ensure data.results not empty and is an array
    if (!data.results || !Array.isArray(data.results)) return [];

    // Return the shows
    return data.results;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching shows data");
  }
}

// API for getting specific show
export async function getShow(showId: number): Promise<IShow> {
  try {
    // Fetching the data
    const response = await fetch(
      `${MEDIA_URL}tv/${showId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(`Failed to fetch the show data: ${response.statusText}`);
    }

    // Getting the actual data
    const data = await response.json();

    // Return the show
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching show data");
  }
}

// API for getting show's specific season
export async function getSeason(
  showId: string,
  seasonNumber: string,
): Promise<ISeason> {
  try {
    // Fetching the data
    const response = await fetch(
      `${MEDIA_URL}tv/${showId}/season/${seasonNumber}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the season data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Return the show
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching season data");
  }
}
