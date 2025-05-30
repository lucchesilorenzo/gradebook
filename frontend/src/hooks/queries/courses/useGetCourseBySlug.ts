import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { TeacherCourse } from "@/types";

export function useGetCourseBySlug(courseSlug?: string) {
  return useQuery({
    queryKey: ["course", courseSlug],
    queryFn: (): Promise<TeacherCourse> =>
      fetchData(`/courses/teacher/${courseSlug}`),
    enabled: !!courseSlug,
  });
}
