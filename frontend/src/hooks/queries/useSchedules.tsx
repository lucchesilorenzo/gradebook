import { fetchData } from "@/lib/api-client";
import { Schedule } from "@/lib/types/schedules-types";
import { useQuery } from "@tanstack/react-query";

export function useSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: (): Promise<Schedule[]> => fetchData("/schedules"),
  });
}
