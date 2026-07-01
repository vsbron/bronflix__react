import { APIFetchType, ISeason, IShow, IShowList } from "@/lib/typesAPI";

// API for getting the shows
export async function getShows(type: APIFetchType): Promise<IShowList[]> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(`/.netlify/functions/tmdb-shows?type=${type}`);

    // Guard clause
    if (!response.ok) {
      throw new Error(`Failed to fetch the shows data: ${response.statusText}`);
    }

    // Getting the actual data
    const data = await response.json();

    // Ensure data.results not empty and is an array
    if (!data.results || !Array.isArray(data.results)) return [];

    // Return the movies
    return data.results;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching shows data");
  }
}

// API for getting specific show
export async function getShow(showId: number): Promise<IShow> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(`/.netlify/functions/tmdb-show?id=${showId}`);

    // Guard clause
    if (!response.ok) {
      throw new Error(`Failed to fetch the movie data: ${response.statusText}`);
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
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-season?id=${showId}&season=${seasonNumber}`,
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
