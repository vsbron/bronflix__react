import { useQueries } from "@tanstack/react-query";
import { getShow } from "@/services/apiShows";
import { IShow } from "@/lib/typesAPI";

export function useWatchListShows(ids: number[]) {
  const { isLoading, shows, error } = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["show", id],
      queryFn: () => getShow(id),
      staleTime: 1000 * 60 * 60,
    })),
    combine: (results) => ({
      shows: results.map((r) => r.data).filter((s): s is IShow => s != null),
      isLoading: results.some((r) => r.isLoading),
      error: results.find((r) => r.error)?.error ?? null,
    }),
  });

  return { isLoading, shows, error };
}
