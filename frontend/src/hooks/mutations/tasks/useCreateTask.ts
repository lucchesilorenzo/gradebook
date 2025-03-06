import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { postData } from "@/lib/api-client";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string }) => postData("/tasks", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
