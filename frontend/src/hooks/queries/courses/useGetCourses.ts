import { fetchData } from "@/lib/api-client";
import { TeacherCourse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: (): Promise<TeacherCourse[]> => fetchData("/courses/teacher"),
  });
}
