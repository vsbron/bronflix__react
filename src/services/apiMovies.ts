import { APIFetchType, IMovie, IMovieList } from "@/lib/typesAPI";

// API for getting movies
export async function getMovies(type: APIFetchType): Promise<IMovieList[]> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-movies?type=${type}`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the movies data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Make sure data.results not empty and is an array
    if (!data.results || !Array.isArray(data.results)) return [];

    // Return the movies
    return data.results;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching movies data");
  }
}

// API for getting upcoming movies
export async function getUpcomingMovies(): Promise<IMovieList[]> {
  try {
    // Getting current day
    const today = new Date().toISOString().split("T")[0];

    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-movies?type=upcoming`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the upcoming movies data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Make sure data.results not empty and is an array
    if (!data.results || !Array.isArray(data.results)) return [];

    // Filter movies that are releasing after today
    const upcomingMovies = data.results.filter(
      (movie: IMovie) => movie.release_date > today,
    );

    // Return the movies
    return upcomingMovies;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching upcoming movies data");
  }
}

// API for getting specific movie
export async function getMovie(movieId: number): Promise<IMovie> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-movie?id=${movieId}`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(`Failed to fetch the movie data: ${response.statusText}`);
    }

    // Getting the actual data
    const data = await response.json();

    // Return the movie
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching movie data");
  }
}
