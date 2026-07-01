import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Get the shows list type from query params (popular, top_rated, upcoming, etc.)
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  // Guard clause
  if (!type) {
    return new Response(JSON.stringify({ error: "Missing show type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${type}?api_key=${Netlify.env.get("TMDB_API_KEY")}&page=1&include_adult=false`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch show data" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Getting the actual data
  const data = await response.json();

  // Cache for 30 minutes
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
    },
  });
};
