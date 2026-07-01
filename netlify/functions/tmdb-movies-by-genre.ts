import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Get the genre ID from query params
  const url = new URL(req.url);
  const genreId = url.searchParams.get("id");

  // Guard clause
  if (!genreId) {
    return new Response(JSON.stringify({ error: "Missing genre ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${Netlify.env.get("TMDB_API_KEY")}&with_genres=${genreId}`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch the movies with selected genre: ${response.statusText}`,
      }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Getting the actual data
  const data = await response.json();

  // Caches for 1 hour
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
};
