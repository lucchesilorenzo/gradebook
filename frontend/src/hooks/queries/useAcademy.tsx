import { fetchData } from "@/lib/api-client";
import { Academy } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useAcademy() {
  return useQuery({
    queryKey: ["academy"],
    queryFn: (): Promise<Academy> => fetchData("/academy"),
  });
}
