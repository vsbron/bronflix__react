import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Get the movie ID from query params
  const url = new URL(req.url);
  const movieId = url.searchParams.get("id");

  // Guard clause
  if (!movieId) {
    return new Response(JSON.stringify({ error: "Missing movie ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Pull the API Key
  const apiKey = Netlify.env.get("TMDB_API_KEY");

  // Fetch from TMDB — key never leaves the server
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch movie data" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const data = await response.json();

  // Return data with cache headers — CDN caches for 1 hour, serves stale for 24h while revalidating
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
};
