import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { TeacherCourse } from "@/types";

export function useGetCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: (): Promise<TeacherCourse[]> => fetchData("/courses/teacher"),
  });
}
