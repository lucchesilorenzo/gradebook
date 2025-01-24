import { fetchData } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useNotifications(page: number) {
  return useQuery({
    queryKey: ["notifications", page],
    queryFn: (): Promise<string[]> => fetchData(`/notifications?page=${page}`),
  });
}
