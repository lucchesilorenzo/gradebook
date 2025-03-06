import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateData } from "@/lib/api-client";

export function useUpdateAssignmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentId: string) =>
      updateData(`/assignments/${assignmentId}/status`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
