import "@netlify/functions";
import { TMDB_BASE_URL } from "../utils/constants";
import "./_shared/useLocalProxy";

export default async (req: Request) => {
  // Get the media type from query params
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  // Guard clause
  if (!type) {
    return new Response(JSON.stringify({ error: "Missing genre type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `${TMDB_BASE_URL}/genre/${type}/list?api_key=${Netlify.env.get("TMDB_API_KEY")}`,
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
