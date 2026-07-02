import { IVideo } from "@/lib/typesAPI";

// API for getting specific trailer
export async function getTrailer(
  id: number,
  type: string,
  signal?: AbortSignal,
): Promise<IVideo[]> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-trailer?type=${type}&id=${id}`,
      { signal },
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the trailer data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Return the movie
    return data.results;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching trailer data");
  }
}
