import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateData } from "@/lib/api-client";
import { Desk } from "@/types";

export function useUpdateStudentsDeskPositions(courseSlug?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Desk[]) =>
      updateData(
        `/courses/teacher/${courseSlug}/students/desk-positions`,
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
