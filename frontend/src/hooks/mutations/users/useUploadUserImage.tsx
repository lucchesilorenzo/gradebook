import { postData } from "@/lib/api-client";
import { TProfileUploadImageFormSchema } from "@/lib/validations/profile-validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadUserImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TProfileUploadImageFormSchema) =>
      postData("/users/upload", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
