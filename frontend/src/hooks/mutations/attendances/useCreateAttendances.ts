import { postData } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateAttendances<T>() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T) => postData("/attendances", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
