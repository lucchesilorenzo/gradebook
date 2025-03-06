import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Attendance } from "@/types/attendance-types";

type Slug = {
  courseSlug?: string;
  courseUnitSlug?: string;
};

export function useGetAttendances({ courseSlug, courseUnitSlug }: Slug) {
  return useQuery({
    queryKey: ["attendances"],
    queryFn: (): Promise<Attendance[]> =>
      fetchData(`/attendances/${courseSlug}/${courseUnitSlug}`),
    enabled: !!courseSlug && !!courseUnitSlug,
  });
}
