import { fetchData } from "@/lib/api-client";
import { CourseMaterial } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useCourseMaterials() {
  return useQuery({
    queryKey: ["course-materials"],
    queryFn: (): Promise<CourseMaterial[]> => fetchData("/materials"),
  });
}
