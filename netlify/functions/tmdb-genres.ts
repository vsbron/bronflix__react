import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Get the movie ID from query params
  const url = new URL(req.url);
  const type = url.searchParams.get("genre");

  // Guard clause
  if (!type) {
    return new Response(JSON.stringify({ error: "Missing genre type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/${type}/list?api_key=${Netlify.env.get("TMDB_API_KEY")}`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch the ${type} genres data`,
      }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Getting the actual data
  const data = await response.json();

  // Return the response with 1 hour cache
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
};
