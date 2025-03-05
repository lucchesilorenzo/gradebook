import { fetchData } from "@/lib/api-client";
import { StudentWithGrades } from "@/types";
import { useQuery } from "@tanstack/react-query";

type getStudentGradesForUnit = {
  courseSlug?: string;
  courseUnitSlug?: string;
  studentId?: string;
};

export function useGetStudentGradesForUnit({
  courseSlug,
  courseUnitSlug,
  studentId,
}: getStudentGradesForUnit) {
  return useQuery({
    queryKey: ["student-grades"],
    queryFn: (): Promise<StudentWithGrades> =>
      fetchData(
        `/courses/teacher/${courseSlug}/${courseUnitSlug}/students/${studentId}/grades`,
      ),
  });
}
