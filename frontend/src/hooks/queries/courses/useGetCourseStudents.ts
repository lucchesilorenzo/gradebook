import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Student } from "@/types";

export function useGetCourseStudents(courseSlug: string) {
  return useQuery({
    queryKey: ["course-students"],
    queryFn: (): Promise<Student[]> =>
      fetchData(`/courses/teacher/${courseSlug}/students`),
  });
}
