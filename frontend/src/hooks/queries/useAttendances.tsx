import { fetchData } from "@/lib/api-client";
import { Attendance } from "@/lib/types/attendances-types";
import { useQuery } from "@tanstack/react-query";

type Slug = {
  courseSlug?: string;
  courseUnitSlug?: string;
};

export function useAttendances({ courseSlug, courseUnitSlug }: Slug) {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: (): Promise<Attendance[]> =>
      fetchData(`/attendances/${courseSlug}/${courseUnitSlug}`),
    enabled: !!courseSlug && !!courseUnitSlug,
  });
}
