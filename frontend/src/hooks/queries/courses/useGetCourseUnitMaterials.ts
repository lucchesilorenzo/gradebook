import { fetchData } from "@/lib/api-client";
import { CourseUnitMaterial } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Slug = {
  courseSlug: string;
  courseUnitSlug: string;
};

export function useGetCourseUnitMaterials({
  courseSlug,
  courseUnitSlug,
}: Slug) {
  return useQuery({
    queryKey: ["course-materials"],
    queryFn: (): Promise<CourseUnitMaterial[]> =>
      fetchData(`/materials/${courseSlug}/${courseUnitSlug}`),
  });
}
