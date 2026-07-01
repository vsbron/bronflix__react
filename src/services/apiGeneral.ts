import { IBase, ICastCrew } from "@/lib/typesAPI";

// API for getting media cast and crew
export async function getMediaCastCrew(
  mediaId: number,
  type: string,
): Promise<ICastCrew> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-cast-crew?id=${mediaId}&type=${type}`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the cast & crew data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Return the actor
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching cast & crew data");
  }
}

// API for getting similar media
export async function getMediaSimilar(
  mediaId: number,
  type: string,
): Promise<IBase[]> {
  try {
    // Fetching the data through serverless function
    const response = await fetch(
      `/.netlify/functions/tmdb-similar?id=${mediaId}&type=${type}`,
    );

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch related ${type} data: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Return the movies
    return data.results;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred while fetching related ${type} data`);
  }
}
