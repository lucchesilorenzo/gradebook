import { deleteData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCourseMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseMaterialId: string) =>
      deleteData(`/materials/${courseMaterialId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course-materials"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
