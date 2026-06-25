import { useQueries } from "@tanstack/react-query";

import { IPerson } from "@/lib/typesAPI";
import { getPerson } from "@/services/apiPerson";

export function usePeopleList(ids: number[]) {
  const { isLoading, people, error } = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["person", id],
      queryFn: () => getPerson(id),
      staleTime: 1000 * 60 * 60,
    })),
    combine: (results) => ({
      people: results.map((r) => r.data).filter((p): p is IPerson => p != null),
      isLoading: results.some((r) => r.isLoading),
      error: results.find((r) => r.error)?.error ?? null,
    }),
  });

  return { isLoading, people, error };
}
