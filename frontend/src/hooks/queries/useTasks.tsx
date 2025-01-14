import { fetchData } from "@/lib/api-client";
import { TTask } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: (): Promise<TTask[]> => fetchData("/tasks"),
  });
}
