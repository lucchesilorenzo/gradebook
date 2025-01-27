import { fetchData } from "@/lib/api-client";
import { TeacherCourse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: (): Promise<TeacherCourse[]> => fetchData("/courses/teacher"),
  });
}
