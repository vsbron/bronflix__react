import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Get the show ID from query params
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const page = Number(url.searchParams.get("page")) || 1;

  // Guard clause
  if (!query) {
    return new Response(JSON.stringify({ error: "Missing search query" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${Netlify.env.get("TMDB_API_KEY")}&query=${encodeURIComponent(query)}&page=${page}`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch the search results data" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Getting the actual data
  const data = await response.json();

  // Return the response with no caching
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
