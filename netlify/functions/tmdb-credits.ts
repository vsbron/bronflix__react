import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Get the movie ID from query params
  const url = new URL(req.url);
  const personId = url.searchParams.get("id");

  // Guard clause
  if (!personId) {
    return new Response(JSON.stringify({ error: "Missing person ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Create two endpoints for fetching
  const endpoints = [
    `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${Netlify.env.get("TMDB_API_KEY")}`,
    `https://api.themoviedb.org/3/person/${personId}/tv_credits?api_key=${Netlify.env.get("TMDB_API_KEY")}`,
  ];

  // Fetching data concurrently
  const [moviesResponse, showsResponse] = await Promise.all(
    endpoints.map((endpoint) => fetch(endpoint)),
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

  // Return the response with 1 hour cache
  return new Response(JSON.stringify({ movies, shows }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
};
