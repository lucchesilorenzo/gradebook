import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { postData, updateData } from "@/lib/api-client";
import { TCourseUnitMaterialsEditFormSchema } from "@/validations/course-validations";

type CourseUnitMaterialEditForm = {
  data: FormData | TCourseUnitMaterialsEditFormSchema;
  courseUnitMaterialId: string;
};

export function useUpdateCourseUnitMaterial(courseUnitMaterialType: string) {
  const queryClient = useQueryClient();
  const httpMethod = courseUnitMaterialType === "PDF" ? postData : updateData;

  return useMutation({
    mutationFn: ({ data, courseUnitMaterialId }: CourseUnitMaterialEditForm) =>
      httpMethod(`/materials/${courseUnitMaterialId}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course-materials"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
