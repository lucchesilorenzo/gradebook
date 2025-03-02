import { fetchData } from "@/lib/api-client";
import { Academy } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetAcademy() {
  return useQuery({
    queryKey: ["academy"],
    queryFn: (): Promise<Academy> => fetchData("/academy"),
  });
}
