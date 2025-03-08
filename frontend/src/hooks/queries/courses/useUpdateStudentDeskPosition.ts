import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateData } from "@/lib/api-client";
import { TDeskFormSchema } from "@/validations/canvas-validations";

export function useUpdateStudentDeskPosition(courseSlug?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ student_id: studentId, ...data }: TDeskFormSchema) =>
      updateData(
        `/courses/teacher/${courseSlug}/students/${studentId}/desk-position`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course-students"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
