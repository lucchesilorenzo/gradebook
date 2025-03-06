import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateData } from "@/lib/api-client";
import {
  TAssignmentGradeFormSchema,
  TAssignmentNotesFormSchema,
} from "@/validations/assignment-validations";

type Id = {
  assignmentId: string;
  studentId: string;
};

export function useUpdateAssignmentStudentRecord({
  assignmentId,
  studentId,
}: Id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: TAssignmentGradeFormSchema | TAssignmentNotesFormSchema,
    ) => updateData(`/assignments/${assignmentId}/${studentId}/records`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
