import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Academy } from "@/types";

export function useGetAcademy() {
  return useQuery({
    queryKey: ["academy"],
    queryFn: (): Promise<Academy> => fetchData("/academy"),
  });
}
