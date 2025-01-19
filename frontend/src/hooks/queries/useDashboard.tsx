import { fetchData } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: (): Promise<number> => fetchData("/dashboard"),
  });
}
