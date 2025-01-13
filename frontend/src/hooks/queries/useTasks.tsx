import { fetchData } from "@/lib/api-client";
import { Task } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: (): Promise<Task[]> => fetchData("/tasks"),
  });
}
