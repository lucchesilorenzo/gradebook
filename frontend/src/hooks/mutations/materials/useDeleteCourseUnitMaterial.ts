import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteData } from "@/lib/api-client";

export function useDeleteCourseUnitMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseUnitMaterialId: string) =>
      deleteData(`/materials/${courseUnitMaterialId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course-materials"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
