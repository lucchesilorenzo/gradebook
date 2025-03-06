import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Assignment } from "@/types/assignment-types";

type Slug = {
  courseSlug?: string;
  courseUnitSlug?: string;
  assignmentSlug?: string;
};

export function useGetAssignment({
  courseSlug,
  courseUnitSlug,
  assignmentSlug,
}: Slug) {
  return useQuery({
    queryKey: ["assignments", assignmentSlug],
    queryFn: (): Promise<Assignment> =>
      fetchData(
        `/assignments/${courseSlug}/${courseUnitSlug}/${assignmentSlug}`,
      ),
  });
}
