import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { AssignmentsWithPagination } from "@/types/assignment-types";

type getAssignments = {
  courseSlug?: string;
  courseUnitSlug?: string;
  page?: number;
};

export function useGetAssignments({
  courseSlug,
  courseUnitSlug,
  page,
}: getAssignments) {
  return useQuery({
    queryKey: ["assignments", page],
    queryFn: (): Promise<AssignmentsWithPagination> =>
      fetchData(`/assignments/${courseSlug}/${courseUnitSlug}?page=${page}`),
  });
}
