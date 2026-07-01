import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Get the show ID from query params
  const url = new URL(req.url);
  const collectionId = url.searchParams.get("id");

  // Guard clause
  if (!collectionId) {
    return new Response(JSON.stringify({ error: "Missing collection ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/collection/${collectionId}/?api_key=${Netlify.env.get("TMDB_API_KEY")}`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch the collection data" }),
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
