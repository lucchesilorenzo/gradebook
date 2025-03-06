import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Schedule } from "@/types";

export function useGetSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: (): Promise<Schedule[]> => fetchData("/schedules"),
  });
}
