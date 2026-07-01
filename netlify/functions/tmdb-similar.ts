import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Fetch from TMDB
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
    `https://api.themoviedb.org/3/${type}/${mediaId}/similar?api_key=${Netlify.env.get("TMDB_API_KEY")}&page=1&include_adult=false`,
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
