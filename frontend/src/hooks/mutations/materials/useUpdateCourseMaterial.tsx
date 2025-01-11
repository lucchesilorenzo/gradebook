import { updateData } from "@/lib/api-client";
import { TCourseMaterialsEditFormSchema } from "@/lib/validations/course-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CourseMaterialEditForm = {
  data: FormData | TCourseMaterialsEditFormSchema;
  courseMaterialId: string;
};

export function useUpdateCourseMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, courseMaterialId }: CourseMaterialEditForm) =>
      updateData(`/materials/${courseMaterialId}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course-materials"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
