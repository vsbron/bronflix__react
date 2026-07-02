import "@netlify/functions";
import { TMDB_BASE_URL } from "../utils/constants";

export default async (req: Request) => {
  // Get the media type & ID from query params
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const mediaId = url.searchParams.get("id");

  // Guard clause
  if (!type || !mediaId) {
    return new Response(JSON.stringify({ error: "Missing media type or ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `${TMDB_BASE_URL}/${type}/${mediaId}/videos?api_key=${Netlify.env.get("TMDB_API_KEY")}`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch trailer data" }),
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
