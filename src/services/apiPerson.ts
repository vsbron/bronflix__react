import { IMediaCredit, IPerson, IPersonList } from "@/lib/typesAPI";

// API for getting trending actors
export async function getTrendingActors(): Promise<IPersonList[]> {
  try {
    // Fetching the data through serverless function
    const response = await fetch("/.netlify/functions/tmdb-trending-actors");

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
export async function getPerson(personId: number): Promise<IPerson> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-person?id=${personId}`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the person data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Return the person
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching person data");
  }
}

// API for getting persons' credited work
export async function getPersonCredits(personId: number): Promise<{
  movies: { cast: IMediaCredit[]; crew: IMediaCredit[] };
  shows: { cast: IMediaCredit[]; crew: IMediaCredit[] };
}> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-credits?id=${personId}`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the actors' credit data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const { movies, shows } = await response.json();

    // Return the combined credits list
    return { movies, shows };
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching person's work data");
  }
}
