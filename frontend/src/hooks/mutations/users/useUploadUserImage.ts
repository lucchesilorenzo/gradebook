import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { postData } from "@/lib/api-client";

export function useUploadUserImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => postData("/users/upload", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
