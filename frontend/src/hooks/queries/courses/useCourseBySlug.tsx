import { fetchData } from "@/lib/api-client";
import { TeacherCourse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useCourseBySlug(courseSlug?: string) {
  return useQuery({
    queryKey: ["course", courseSlug],
    queryFn: (): Promise<TeacherCourse> =>
      fetchData(`/courses/teacher/${courseSlug}`),
    enabled: !!courseSlug,
  });
}
