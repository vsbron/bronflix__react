import "@netlify/functions";
import { TMDB_BASE_URL } from "../utils/constants";

export default async (req: Request) => {
  // Get the search query and page number from query params
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const page = Number(url.searchParams.get("page"));

  // Guard clause
  if (!query) {
    return new Response(JSON.stringify({ error: "Missing search query" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `${TMDB_BASE_URL}/search/multi?api_key=${Netlify.env.get("TMDB_API_KEY")}&query=${encodeURIComponent(query)}&page=${page}`,
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
