import { fetchData } from "@/lib/api-client";
import { TaskWithPagination } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetTasks(page: number) {
  return useQuery({
    queryKey: ["tasks", page],
    queryFn: (): Promise<TaskWithPagination> =>
      fetchData(`/tasks?page=${page}`),
  });
}
