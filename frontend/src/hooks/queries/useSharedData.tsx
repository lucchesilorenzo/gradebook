import { fetchData } from "@/lib/api-client";
import { TeacherCourse } from "@/lib/types";
import { useQueries } from "@tanstack/react-query";

export function useSharedData() {
  return useQueries({
    queries: [
      {
        queryKey: ["courses"],
        queryFn: (): Promise<TeacherCourse[]> => fetchData("/courses/teacher"),
      },
    ],
  });
}
