import { fetchData } from "@/lib/api-client";
import { Schedule } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetSchedules() {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: (): Promise<Schedule[]> => fetchData("/schedules"),
  });
}
