import { useQueries } from "@tanstack/react-query";
import { getMovie } from "@/services/apiMovies";
import { IMovie } from "@/lib/typesAPI";

export function useWatchListMovies(ids: number[]) {
  const { isLoading, movies, error } = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => getMovie(id),
      staleTime: 1000 * 60 * 60,
    })),
    combine: (results) => ({
      movies: results.map((r) => r.data).filter((m): m is IMovie => m != null),
      isLoading: results.some((r) => r.isLoading),
      error: results.find((r) => r.error)?.error ?? null,
    }),
  });

  return { isLoading, movies, error };
}
