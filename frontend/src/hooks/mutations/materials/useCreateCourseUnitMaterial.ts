import { postData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CourseUnitMaterialWithSlug = {
  data: FormData;
  courseSlug?: string;
  courseUnitSlug?: string;
};

export function useCreateCourseUnitMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      courseSlug,
      courseUnitSlug,
    }: CourseUnitMaterialWithSlug) =>
      postData(`/materials/${courseSlug}/${courseUnitSlug}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course-materials"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
