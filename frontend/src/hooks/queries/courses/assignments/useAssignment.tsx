import { fetchData } from "@/lib/api-client";
import { AssignmentWithoutSubmissionCount } from "@/lib/types/assignment-types";
import { useQuery } from "@tanstack/react-query";

type Slug = {
  courseSlug?: string;
  courseUnitSlug?: string;
  assignmentSlug?: string;
};

export function useAssignment({
  courseSlug,
  courseUnitSlug,
  assignmentSlug,
}: Slug) {
  return useQuery({
    queryKey: ["assignments", assignmentSlug],
    queryFn: (): Promise<AssignmentWithoutSubmissionCount> =>
      fetchData(
        `/assignments/${courseSlug}/${courseUnitSlug}/${assignmentSlug}`,
      ),
  });
}
