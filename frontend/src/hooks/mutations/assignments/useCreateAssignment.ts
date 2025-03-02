import { postData } from "@/lib/api-client";
import { TAssignmentFormSchema } from "@/validations/assignment-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Slug = {
  courseSlug?: string;
  courseUnitSlug?: string;
};

export function useCreateAssignment({ courseSlug, courseUnitSlug }: Slug) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TAssignmentFormSchema) =>
      postData(`/assignments/${courseSlug}/${courseUnitSlug}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
