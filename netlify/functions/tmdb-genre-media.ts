import "@netlify/functions";
import { TMDB_BASE_URL } from "../utils/constants";
import "./_shared/useLocalProxy";

export default async (req: Request) => {
  // Get the media type, genre ID and page number from query params
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const genreId = url.searchParams.get("id");
  const page = url.searchParams.get("page");

  // Guard clause
  if (!type || !genreId) {
    return new Response(
      JSON.stringify({ error: "Missing media type or genre ID" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Fetch from TMDB
  const response = await fetch(
    `${TMDB_BASE_URL}/discover/${type}?api_key=${Netlify.env.get("TMDB_API_KEY")}&with_genres=${genreId}&page=${page}`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch the ${type} under chosen genre data`,
      }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Getting the actual data
  const data = await response.json();

  // Return the response with 30 minutes cache
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
    },
  });
};
