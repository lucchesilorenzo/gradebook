import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { DashboardSummary } from "@/types";

export function useGetDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: (): Promise<DashboardSummary> => fetchData("/dashboard"),
  });
}
