import { fetchData } from "@/lib/api-client";
import { Assignment } from "@/lib/types/assignment-types";
import { useQuery } from "@tanstack/react-query";

type Slug = {
  courseSlug?: string;
  courseUnitSlug?: string;
};

export function useAssignments({ courseSlug, courseUnitSlug }: Slug) {
  return useQuery({
    queryKey: ["assignments"],
    queryFn: (): Promise<Assignment[]> =>
      fetchData(`/assignments/${courseSlug}/${courseUnitSlug}`),
  });
}
