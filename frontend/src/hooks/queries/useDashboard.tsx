import { fetchData } from "@/lib/api-client";
import { DashboardSummary } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: (): Promise<DashboardSummary> => fetchData("/dashboard"),
  });
}
