import "@netlify/functions";
import { TMDB_BASE_URL } from "../utils/constants";

export default async () => {
  // Fetch from TMDB
  const response = await fetch(
    `${TMDB_BASE_URL}/person/popular?api_key=${Netlify.env.get("TMDB_API_KEY")}`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch the actors data" }),
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
      "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
    },
  });
};
