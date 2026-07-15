import "@netlify/functions";
import { TMDB_BASE_URL } from "../utils/constants";
import "./_shared/useLocalProxy";

export default async (req: Request) => {
  // Get the media type & ID from query params
  const url = new URL(req.url);
  const mediaId = url.searchParams.get("id");
  const type = url.searchParams.get("type");

  // Guard clause
  if (!type || !mediaId) {
    return new Response(JSON.stringify({ error: "Missing media type or ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from TMDB
  const response = await fetch(
    `${TMDB_BASE_URL}/${type}/${mediaId}/similar?api_key=${Netlify.env.get("TMDB_API_KEY")}&page=1&include_adult=false`,
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch the related ${type} data` }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Getting the actual data
  const data = await response.json();

  // Return the response with 30 minutes cache
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
};
