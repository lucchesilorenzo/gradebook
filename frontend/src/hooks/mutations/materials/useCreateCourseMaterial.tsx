import { postData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CourseMaterialWithSlug = {
  data: FormData;
  courseUnitSlug?: string;
};

export function useCreateCourseMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, courseUnitSlug }: CourseMaterialWithSlug) =>
      postData(`/materials/${courseUnitSlug}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course-materials"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
