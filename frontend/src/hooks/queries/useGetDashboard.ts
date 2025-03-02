import { fetchData } from "@/lib/api-client";
import { DashboardSummary } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: (): Promise<DashboardSummary> => fetchData("/dashboard"),
  });
}
