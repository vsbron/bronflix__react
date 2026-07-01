import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Get the movie ID from query params
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const genreId = url.searchParams.get("id");
  const page = url.searchParams.get("page") || 1;

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
    `https://api.themoviedb.org/3/discover/${type}?api_key=${Netlify.env.get("TMDB_API_KEY")}&with_genres=${genreId}&page=${page}`,
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
