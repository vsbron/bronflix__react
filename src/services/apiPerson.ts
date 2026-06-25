import { MEDIA_URL } from "@/lib/constants";
import { IMediaCredit, IPerson, IPersonList } from "@/lib/typesAPI";

// API for getting trending actors
export async function getTrendingActors(): Promise<IPersonList[]> {
  try {
    // Fetch the data
    const response = await fetch(
      `${MEDIA_URL}person/popular?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&page=1`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the actors data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Ensure data.results not empty and is an array
    if (!data.results || !Array.isArray(data.results)) return [];

    // Return the actors
    return data.results;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching actors data");
  }
}

// API for getting specific person
export async function getPerson(movieId: number): Promise<IPerson> {
  try {
    // Fetching the data
    const response = await fetch(
      `${MEDIA_URL}person/${movieId}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(`Failed to fetch the movie data: ${response.statusText}`);
    }

    // Getting the actual data
    const data = await response.json();

    // Return the person
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching actor data");
  }
}

// API for getting persons` credited work
export async function getPersonCredits(personId: number): Promise<{
  movies: { cast: IMediaCredit[]; crew: IMediaCredit[] };
  shows: { cast: IMediaCredit[]; crew: IMediaCredit[] };
}> {
  // Creating urls for fetching
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const endpoints = [
    `${MEDIA_URL}person/${personId}/movie_credits?api_key=${API_KEY}`,
    `${MEDIA_URL}person/${personId}/tv_credits?api_key=${API_KEY}`,
  ];

  try {
    // Fetching data concurrently
    const [moviesResponse, showsResponse] = await Promise.all(
      endpoints.map((url) => fetch(url)),
    );

    // Guard clause
    if (!moviesResponse.ok || !showsResponse.ok) {
      throw new Error("Failed to fetch the person's work data");
    }

    // Parsing the data
    const [movies, shows] = await Promise.all([
      moviesResponse.json(),
      showsResponse.json(),
    ]);

    // Return the combined credits list
    return { movies, shows };
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching person's work data");
  }
}
