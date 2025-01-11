import { postData, updateData } from "@/lib/api-client";
import { TCourseMaterialsEditFormSchema } from "@/lib/validations/course-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CourseMaterialEditForm = {
  data: FormData | TCourseMaterialsEditFormSchema;
  courseMaterialId: string;
};

export function useUpdateCourseMaterial(courseMaterialType: string) {
  const queryClient = useQueryClient();
  const httpMethod = courseMaterialType === "PDF" ? postData : updateData;

  return useMutation({
    mutationFn: ({ data, courseMaterialId }: CourseMaterialEditForm) =>
      httpMethod(`/materials/${courseMaterialId}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course-materials"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
